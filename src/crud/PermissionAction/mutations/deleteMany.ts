import { mutationField, nonNull } from 'nexus'

export const PermissionActionDeleteManyMutation = mutationField(
  'deleteManyPermissionAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PermissionActionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.permissionAction.deleteMany({ where } as any)
    },
  },
)
