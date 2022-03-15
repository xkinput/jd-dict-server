import { mutationField, nonNull } from 'nexus'

export const PermissionActionDeleteOneMutation = mutationField(
  'deleteOnePermissionAction',
  {
    type: 'PermissionAction',
    args: {
      where: nonNull('PermissionActionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.permissionAction.delete({
        where,
        ...select,
      })
    },
  },
)
