import { enumType, extendType, inputObjectType, list } from 'nexus'

export const PullRequestEvaluationAction = enumType({
  name: 'PullRequestEvaluationAction',
  members: [
    {
      name: 'Like',
      value: 'Like',
      description: '赞'
    },
    {
      name: 'Dislike',
      value: 'Dislike',
      description: '踩'
    }
  ]
})

export const ExtendsPullRequestLiked = extendType({
  type: 'PullRequest',
  definition(t) {
    t.nullable.field('evaluation', {
      description: '我的评价',
      type: 'PullRequestEvaluationAction',
      async resolve(parent, _args, { prisma, ctx }) {
        if (!parent.id || !ctx.state.user?.id) return null
        let like = await prisma.pullRequest.count({
          where: {
            id: parent.id,
            likes: {
              some: {
                id: ctx.state.user.id
              }
            },
          },
        }) > 0
        let disliked = await prisma.pullRequest.count({
          where: {
            id: parent.id,
            dislikes: {
              some: {
                id: ctx.state.user.id
              }
            },
          },
        }) > 0

        return like ? 'Like' : disliked ? 'Dislike' : null
      }
    })
  }
})

export const PullRequestEvaluationData = inputObjectType({
  name: 'PullRequestEvaluationData',
  definition(t) {
    t.nonNull.field({
      name: 'action',
      type: 'PullRequestEvaluationAction'
    })
  }
})
