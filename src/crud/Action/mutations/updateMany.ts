import { mutationField, nonNull } from 'nexus'

export const ActionUpdateManyMutation = mutationField('updateManyAction', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('ActionUpdateManyMutationInput'),
    where: 'ActionWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.action.updateMany(args as any)
  },
})
