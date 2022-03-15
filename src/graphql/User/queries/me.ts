import { queryField, list, nonNull } from 'nexus'

export const UserMeQuery = queryField('findUserMe', {
  type: 'User',
  resolve(_parent, args, { prisma, select, ctx }) {
    return prisma.user.findFirst({
      where: {
        id: ctx.state.user.id,
      },
      ...args,
      ...select,
    })
  },
})
