import { mutationField, nonNull } from 'nexus'

export const PermissionDeleteOneMutation = mutationField(
  'deleteOnePermission',
  {
    type: 'Permission',
    args: {
      where: nonNull('PermissionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.permission.delete({
        where,
        ...select,
      })
    },
  },
)
