import { PrismaClient, PullRequestType } from '@prisma/client'
import { ApolloError } from 'apollo-server-koa'
import { mutationField, nonNull } from 'nexus'

import { entriesObjectStringify } from '@/utils/tools'
import { ErrorCode, IssueUserCreateInput } from '@/graphql'
import { NexusGenInputs } from '@/generated/nexus'

type Pr = NexusGenInputs['IssueUserCreateInput']['pullRequests'][number]
async function validPrInputType(pr: Pr, errors: ApolloError[], prisma: PrismaClient) {
  // 非创建时，原词条必选
  if (pr.type !== 'Create' && !pr.phraseId) {
    errors.push(new ApolloError(`PhraseId is required data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1000))
  } else if (pr.phraseId) {
    if (await prisma.phrase.count({ where: { id: pr.phraseId } }) === 0) errors.push(new ApolloError(`Phrase is not exists data:{${entriesObjectStringify(pr)}}`, ErrorCode.PH1000))
  }

  // 创建时，词条与编码都为必填
  if ('Create' === pr.type) {
    if (!pr.word || !pr.code) errors.push(new ApolloError(`Word and Code is required data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1001))
  }

  // 创建或修改时，词条或编码必填一项
  if ((['Create', 'Change'] as PullRequestType[]).includes(pr.type)) {
    if (!pr.word && !pr.code) errors.push(new ApolloError(`Word or Code required one optional data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1002))
  }

  // 移动时排序值必填
  if ((['Move'] as PullRequestType[]).includes(pr.type)) {
    if (!pr.index) errors.push(new ApolloError(`Index is required ${JSON.stringify(pr)}`, ErrorCode.PR1003))
  }
}

/**存在相同词条或PR */
async function validExistCreatePhOrPr(pr: Pr, prisma: PrismaClient) {
  if (pr.type === 'Create') {
    let phraseCount = await prisma.phrase.count({
      where: {
        word: pr.word,
        code: pr.code,
      }
    })
    if (phraseCount > 0) throw new ApolloError(`Phrase is exists data:{${entriesObjectStringify(pr)}}`, ErrorCode.PH1001)

    let prCount = await prisma.pullRequest.count({
      where: {
        word: pr.word,
        code: pr.code,
      }
    })
    if (prCount > 0) throw new ApolloError(`PullRequest is exists data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1004)
  }
}

export const IssueCreateOneMutation = mutationField('createOneIssue', {
  type: nonNull('Issue'),
  args: {
    data: nonNull('IssueUserCreateInput'),
  },
  async resolve(_parent, { data }, { prisma, select, ctx }) {
    const myUserId = ctx.state.user.id

    let errors: ApolloError[] = []

    for (let pr of data.pullRequests) {
      await validPrInputType(pr, errors, prisma)
      await validExistCreatePhOrPr(pr, prisma)
    }

    if (errors.length > 0) throw new ApolloError(errors.join(', '), ErrorCode.PR2000, {
      errors,
    })

    return prisma.issue.create({
      data: {
        content: data.content,
        pullRequests: {
          create: data.pullRequests.map(it => ({
            ...it,
            index: it.index ?? 0,
          })),
        },
        user: {
          connect: {
            id: myUserId,
          }
        }
      },
      ...select,
    })
  },
})
