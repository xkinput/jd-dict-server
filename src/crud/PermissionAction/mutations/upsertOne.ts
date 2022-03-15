import { mutationField, nonNull } from 'nexus'

export const PermissionActionUpsertOneMutation = mutationField(
  'upsertOnePermissionAction',
  {
    type: nonNull('PermissionAction'),
    args: {
      where: nonNull('PermissionActionWhereUniqueInput'),
      create: nonNull('PermissionActionCreateInput'),
      update: nonNull('PermissionActionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionAction.upsert({
        ...args,
        ...select,
      })
    },
  },
)
