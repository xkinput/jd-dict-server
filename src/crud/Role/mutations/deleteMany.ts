import { mutationField, nonNull } from 'nexus'

export const RoleDeleteManyMutation = mutationField('deleteManyRole', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'RoleWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.role.deleteMany({ where } as any)
  },
})
