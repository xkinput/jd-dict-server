import { queryField, nonNull } from 'nexus'

export const PermissionActionFindUniqueQuery = queryField(
  'findUniquePermissionAction',
  {
    type: 'PermissionAction',
    args: {
      where: nonNull('PermissionActionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.permissionAction.findUnique({
        where,
        ...select,
      })
    },
  },
)
