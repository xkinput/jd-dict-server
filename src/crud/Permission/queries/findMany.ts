import { queryField, nonNull, list } from 'nexus'

export const PermissionFindManyQuery = queryField('findManyPermission', {
  type: nonNull(list(nonNull('Permission'))),
  args: {
    where: 'PermissionWhereInput',
    orderBy: list('PermissionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PermissionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PermissionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.permission.findMany({
      ...args,
      ...select,
    })
  },
})
