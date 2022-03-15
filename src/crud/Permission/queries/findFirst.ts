import { queryField, list } from 'nexus'

export const PermissionFindFirstQuery = queryField('findFirstPermission', {
  type: 'Permission',
  args: {
    where: 'PermissionWhereInput',
    orderBy: list('PermissionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PermissionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PermissionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.permission.findFirst({
      ...args,
      ...select,
    })
  },
})
