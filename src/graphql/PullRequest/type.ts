import { extendType, inputObjectType, list } from 'nexus'

export const ExtendsPullRequestLiked = extendType({
  type: 'PullRequest',
  definition(t) {
    t.boolean('liked', {
      description: '已喜欢',
      async resolve(parent, args, { prisma, ctx }) {
        if (!parent.id || !ctx.state.user?.id) return false
        return await prisma.pullRequest.count({
          where: {
            id: parent.id,
            likes: {
              some: {
                id: ctx.state.user.id
              }
            }
          },
        }) > 0
      }
    })
  }
})
