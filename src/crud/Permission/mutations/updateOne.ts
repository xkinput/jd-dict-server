import { mutationField, nonNull } from 'nexus'

export const PermissionUpdateOneMutation = mutationField(
  'updateOnePermission',
  {
    type: nonNull('Permission'),
    args: {
      data: nonNull('PermissionUpdateInput'),
      where: nonNull('PermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.permission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
