import { mutationField, nonNull } from 'nexus'

export const PermissionCreateOneMutation = mutationField(
  'createOnePermission',
  {
    type: nonNull('Permission'),
    args: {
      data: nonNull('PermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.permission.create({
        data,
        ...select,
      })
    },
  },
)
