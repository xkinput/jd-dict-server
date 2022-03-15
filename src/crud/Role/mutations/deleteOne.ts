import { mutationField, nonNull } from 'nexus'

export const RoleDeleteOneMutation = mutationField('deleteOneRole', {
  type: 'Role',
  args: {
    where: nonNull('RoleWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.role.delete({
      where,
      ...select,
    })
  },
})
