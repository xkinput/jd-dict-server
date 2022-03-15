import { queryField, nonNull, list } from 'nexus'

export const PermissionFindCountQuery = queryField('findManyPermissionCount', {
  type: nonNull('Int'),
  args: {
    where: 'PermissionWhereInput',
    orderBy: list('PermissionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PermissionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PermissionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.permission.count(args as any)
  },
})
