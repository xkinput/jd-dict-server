import { mutationField, nonNull } from 'nexus'
export const toggleLikePr = mutationField('toggleLikePr', {
  type: 'Boolean',
  args: {
    where: nonNull('PullRequestWhereUniqueInput'),
  },
  description: '切换支持PR',
  async resolve(_parnet, { where }, { prisma, ctx }) {
    const pr = await prisma.pullRequest.findUnique({
      include: {
        likes: true,
      },
      where,
      rejectOnNotFound: true,
    })
    let meUser = await prisma.user.findUnique({
      where: {
        id: ctx.state.user.id,
      }
    })
    let isLiked = await prisma.pullRequest.count({
      where: {
        id: pr.id,
        likes: {
          some: {
            id: meUser.id,
          }
        }
      },
    }) > 0

    await prisma.pullRequest.update({
      where: {
        id: pr.id,
      },
      data: {
        likes: {
          [isLiked ? 'disconnect' : 'connect']: {
            id: meUser.id
          }
        }
      }
    })
    return !isLiked
  }
})
