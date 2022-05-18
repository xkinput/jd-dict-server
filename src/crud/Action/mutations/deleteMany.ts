import { mutationField, nonNull } from 'nexus'

export const ActionDeleteManyMutation = mutationField('deleteManyAction', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ActionWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.action.deleteMany({ where } as any)
  },
})
