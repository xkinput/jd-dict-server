import { mutationField, nonNull } from 'nexus'

export const PermissionUpsertOneMutation = mutationField(
  'upsertOnePermission',
  {
    type: nonNull('Permission'),
    args: {
      where: nonNull('PermissionWhereUniqueInput'),
      create: nonNull('PermissionCreateInput'),
      update: nonNull('PermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
