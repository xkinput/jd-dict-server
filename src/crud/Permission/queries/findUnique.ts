import { queryField, nonNull } from 'nexus'

export const PermissionFindUniqueQuery = queryField('findUniquePermission', {
  type: 'Permission',
  args: {
    where: nonNull('PermissionWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.permission.findUnique({
      where,
      ...select,
    })
  },
})
