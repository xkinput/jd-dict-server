import { mutationField, nonNull } from 'nexus'

export const PermissionActionUpdateManyMutation = mutationField(
  'updateManyPermissionAction',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PermissionActionUpdateManyMutationInput'),
      where: 'PermissionActionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionAction.updateMany(args as any)
    },
  },
)
