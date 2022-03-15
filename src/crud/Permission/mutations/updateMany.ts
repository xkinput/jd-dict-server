import { mutationField, nonNull } from 'nexus'

export const PermissionUpdateManyMutation = mutationField(
  'updateManyPermission',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PermissionUpdateManyMutationInput'),
      where: 'PermissionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permission.updateMany(args as any)
    },
  },
)
