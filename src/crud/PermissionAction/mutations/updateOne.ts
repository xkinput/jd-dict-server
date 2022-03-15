import { mutationField, nonNull } from 'nexus'

export const PermissionActionUpdateOneMutation = mutationField(
  'updateOnePermissionAction',
  {
    type: nonNull('PermissionAction'),
    args: {
      data: nonNull('PermissionActionUpdateInput'),
      where: nonNull('PermissionActionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.permissionAction.update({
        where,
        data,
        ...select,
      })
    },
  },
)
