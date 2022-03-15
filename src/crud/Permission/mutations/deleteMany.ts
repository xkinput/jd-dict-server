import { mutationField, nonNull } from 'nexus'

export const PermissionDeleteManyMutation = mutationField(
  'deleteManyPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PermissionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.permission.deleteMany({ where } as any)
    },
  },
)
