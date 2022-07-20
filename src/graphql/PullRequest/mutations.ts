import { ErrorCode } from '@/graphql/Error'
import { ApolloError } from 'apollo-server-koa'
import { mutationField, nonNull } from 'nexus'

export const togglePullRequestEvaluation = mutationField('togglePullRequestEvaluation', {
  type: nonNull('PullRequest'),
  args: {
    where: nonNull('PullRequestWhereUniqueInput'),
    data: nonNull('PullRequestEvaluationData')
  },
  description: '赞PR',
  async resolve(_parnet, { where, data }, { prisma, ctx, select }) {
    const pr = await prisma.pullRequest.findUnique({
      where,
      rejectOnNotFound: true,
    })

    const ctxUserId = ctx.state.user.id

    let isCtxUserCreated = await prisma.pullRequest.count({
      where: {
        id: pr.id,
        issue: {
          some: {
            userId: ctxUserId
          }
        }
      }
    })
    if (isCtxUserCreated) throw new ApolloError('do\'t evaluation own pr', ErrorCode.PR1007)

    const liked = await prisma.pullRequest.count({
      where: {
        id: pr.id,
        likes: {
          some: {
            id: ctxUserId,
          }
        }
      },
    }) > 0
    const disliked = await prisma.pullRequest.count({
      where: {
        id: pr.id,
        dislikes: {
          some: {
            id: ctxUserId,
          }
        }
      },
    }) > 0

    let toggleToLiked = !liked && disliked && data.action === 'Like'
    let toggleToDisLiked = liked && !disliked && data.action === 'Dislike'

    let updated = await prisma.pullRequest.update({
      where: {
        id: pr.id,
      },
      data: {
        ...((data.action === 'Like' || toggleToDisLiked) && {
          likes: {
            [!liked && !toggleToDisLiked ? 'connect' : 'disconnect']: {
              id: ctxUserId
            }
          },
        }),
        ...((data.action === 'Dislike' || toggleToLiked) && {
          dislikes: {
            [!disliked && !toggleToLiked ? 'connect' : 'disconnect']: {
              id: ctxUserId
            }
          }
        })
      },
      ...select
    })
    return updated
  }
})
