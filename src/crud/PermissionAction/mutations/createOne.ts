import { mutationField, nonNull } from 'nexus'

export const PermissionActionCreateOneMutation = mutationField(
  'createOnePermissionAction',
  {
    type: nonNull('PermissionAction'),
    args: {
      data: nonNull('PermissionActionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.permissionAction.create({
        data,
        ...select,
      })
    },
  },
)
