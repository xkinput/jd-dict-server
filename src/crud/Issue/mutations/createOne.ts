import { PhraseStatus, PhraseType, PrismaClient, PullRequestType } from '@prisma/client'
import { ApolloError } from 'apollo-server-koa'
import { mutationField, nonNull } from 'nexus'

import { entriesObjectStringify } from '@/utils/tools'
import { ErrorCode, IssueUserCreateInput } from '@/graphql'
import { NexusGenInputs } from '@/generated/nexus'

type Pr = NexusGenInputs['IssueUserCreateInput']['pullRequests'][number]
async function validPrInputType(pr: Pr, errors: ApolloError[], prisma: PrismaClient) {
  // 非创建时，原词条必选
  if (pr.pullRequestType !== 'Create' && !pr.phraseId) {
    errors.push(new ApolloError(`PhraseId is required data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1000))
  } else if (pr.phraseId) {
    if (await prisma.phrase.count({ where: { id: pr.phraseId } }) === 0) errors.push(new ApolloError(`Phrase is not exists ${pr.word}`, ErrorCode.PH1000, {
      pr
    }))
  }

  // 创建时，词条与编码都为必填
  if ('Create' === pr.pullRequestType) {
    if (!pr.word || !pr.code || !pr.phraseType) errors.push(new ApolloError(`Word and Code and phraseType is required ${pr.word}`, ErrorCode.PR1001, {
      pr
    }))
  }

  // 创建或修改时，词条或编码必填一项
  if ((['Create', 'Change'] as PullRequestType[]).includes(pr.pullRequestType)) {
    if (!pr.word && !pr.code) errors.push(new ApolloError(`Word or Code required one optional ${pr.word}`, ErrorCode.PR1002, {
      pr
    }))
  }

  // 修改时 不能完全与原词相同
  if (pr.pullRequestType === 'Change') {
    let phrase = await prisma.phrase.findUnique({ where: { id: pr.phraseId } })
    if (phrase.word === pr.word && phrase.code === pr.code && phrase.index === pr.index) errors.push(new ApolloError('PR is dont equal as original phrase', ErrorCode.PR1005, {
      pr
    }))
  }

  // 移动时排序值必填
  if ((['Move'] as PullRequestType[]).includes(pr.pullRequestType)) {
    if (!pr.index) errors.push(new ApolloError(`Index is required ${pr.word}`, ErrorCode.PR1003, {
      pr
    }))
  }
}

/**存在相同词条或PR */
async function validExistCreatePhOrPr(pr: Pr, prisma: PrismaClient) {
  let phrase = await prisma.phrase.findFirst({
    where: {
      word: pr.word,
      code: pr.code,
      type: pr.phraseType
    }
  })

  if (phrase) throw new ApolloError(`Phrase is exists id: ${phrase.id} ${pr.word}`, ErrorCode.PH1001, {
    pr
  })

  let pullRequest = await prisma.pullRequest.findFirst({
    where: {
      word: pr.word,
      code: pr.code,
      type: pr.pullRequestType,
      status: 'Pending'
    }
  })

  if (pullRequest) throw new ApolloError(`pullRequest is exists id: ${pullRequest.id} ${pr.word}`, ErrorCode.PR1004, {
    pr
  })
}

export const IssueCreateOneMutation = mutationField('createOneIssue', {
  type: nonNull('Issue'),
  args: {
    data: nonNull('IssueUserCreateInput'),
  },
  validate: async (_, { data }, { prisma }) => {
    let errors: ApolloError[] = []

    for (let pr of data.pullRequests) {
      await validPrInputType(pr, errors, prisma)
      await validExistCreatePhOrPr(pr, prisma)
    }

    if (errors.length > 0) throw new ApolloError(errors.join(', '), ErrorCode.MU1000, {
      errors,
    })
  },
  resolve(_parent, { data }, { prisma, select, ctx }) {
    const myUserId = ctx.state.user.id

    return prisma.issue.create({
      data: {
        content: data.content,
        pullRequests: {
          create: data.pullRequests.map(it => {
            const { phraseType, pullRequestType, phraseId, tags, ...fields } = it
            return {
              ...fields,
              type: pullRequestType,
              index: it.index ?? 0,
              phrase: {
                ...(pullRequestType === 'Create' ? {
                  create: {
                    word: it.word,
                    code: it.code,
                    type: it.phraseType,
                    index: it.index ?? 0,
                    status: PhraseStatus.Draft,
                    userId: myUserId,
                    tags: {
                      connect: it.tags
                    }
                  }
                } : {
                  connect: {
                    id: phraseId
                  }
                })
              },
            }
          }),
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
