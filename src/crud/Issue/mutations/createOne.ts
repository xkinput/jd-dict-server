import { Phrase, PhraseStatus, PrismaClient, PullRequestType } from '@prisma/client'
import { ApolloError } from 'apollo-server-koa'
import { mutationField, nonNull } from 'nexus'

import { entriesObjectStringify } from '@/utils/tools'
import { ErrorCode, IssueUserCreateInput } from '@/graphql'
import { NexusGenInputs } from '@/generated/nexus'

type Pr = NexusGenInputs['IssueUserCreateInput']['pullRequests'][number]
async function validPrInputType(pr: Pr, prs: Pr[],  errors: ApolloError[], prisma: PrismaClient) {
  // 非创建时，原词条必选
  if (pr.pullRequestType !== 'Create' && !pr.phraseId) {
    errors.push(new ApolloError(`PhraseId is required data:{${entriesObjectStringify(pr)}}`, ErrorCode.PR1000))
  } else if (pr.phraseId) {
    if (await prisma.phrase.count({ where: { id: pr.phraseId } }) === 0) errors.push(new ApolloError(`Phrase is not exists ${pr.word}`, ErrorCode.PH1000, {
      pr,
      args: [pr.word]
    }))
  }

  if (pr.pullRequestType === 'Create') {
    // 创建时，词条与编码都为必填
    if (!pr.word || !pr.code || !pr.phraseType) errors.push(new ApolloError(`Word and Code and phraseType is required ${pr.word}`, ErrorCode.PR1001, {
      pr,
      args: [pr.word]
    }))


  // 创建或修改时，词条或编码必填一项
    if (!pr.word && !pr.code) errors.push(new ApolloError(`Word or Code required one optional ${pr.word}`, ErrorCode.PR1002, {
      pr,
      args: [pr.word]
    }))
  }

  if (pr.pullRequestType === 'Change' && pr.phraseId) {
    if (!pr.word && !pr.code && !pr.index) {
      errors.push(new ApolloError('PR change is required one option', ErrorCode.PR1006, {
        pr,
        args: [pr.word]
      }))
    }

    // 修改时 词条和排序值不能与原词相同
    let phrase = await prisma.phrase.findUnique({ where: { id: pr.phraseId } })
    if ((
        (pr.word ? phrase.word === pr.word : true)
        && (pr.code ? phrase.code === pr.code : true)
        && (pr.index ? phrase.index === pr.index : true)
      )
        && (pr.word || pr.code || pr.index)
    ) {
      errors.push(new ApolloError('PR change is dont equal as original phrase', ErrorCode.PR1005, {
        pr,
        args: [pr.word]
      }))
    }

    // 修改时修改到的编码位置是否已有词条
    phrase = await prisma.phrase.findFirst({ where: { code: pr.code, status: 'Finish' } })
    if (phrase && !someChangeOriginalPhrase(phrase, pr, prs, prisma)) {
      errors.push(new ApolloError(`Code is exists of phrase  but original phrase not action id: ${phrase.id} code: ${pr.code}`, ErrorCode.PH1000, {
        pr,
        args: [pr.code, phrase.id]
      }))
    }
  }

  if (pr.pullRequestType === 'Delete' && pr.phraseId) {
    let existPr = await prisma.pullRequest.findFirst({
      where: {
        phraseId: pr.phraseId,
        type: 'Delete'
      }
    })

    if (existPr) {
      errors.push(new ApolloError(`Pr is exists id: ${existPr.id}`, ErrorCode.PR1004, {
        pr,
        exist: existPr
      }))
    }
  }
}

function someChangeOriginalPhrase(phrase: Phrase, pr: Pr, prs: Pr[], prisma: PrismaClient) {
  return prs
  .filter(it => ['Change', 'Delete'].includes(it.pullRequestType))
  .some(it => it.phraseId === phrase.id)
}

/**存在相同词条或PR */
async function validExistCreatePhOrPr(pr: Pr, prisma: PrismaClient) {
  let phrase = await prisma.phrase.findFirst({
    where: {
      word: pr.word,
      code: pr.code,
    }
  })

  // 不能重复创建相同词条编码类型的词条
  if (phrase) throw new ApolloError(`Phrase is exists id: ${phrase.id} ${pr.word}`, ErrorCode.PH1001, {
    pr,
    exist: phrase,
  })

  let pullRequest = await prisma.pullRequest.findFirst({
    include: {
      issue: true,
    },
    where: {
      word: pr.word,
      code: pr.code,
      type: pr.pullRequestType,
      status: 'Pending'
    }
  })

  if (pullRequest) throw new ApolloError(`pullRequest is exists id: ${pullRequest.id} ${pr.word}`, ErrorCode.PR1004, {
    pr,
    exist: pullRequest,
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
      await validPrInputType(pr, data.pullRequests, errors, prisma)
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
            const { phraseType, pullRequestType, phraseId, _prIndex, tags, ...fields } = it
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
