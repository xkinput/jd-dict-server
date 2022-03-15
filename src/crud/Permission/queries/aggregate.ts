import { queryField, list } from 'nexus'

export const PermissionAggregateQuery = queryField('aggregatePermission', {
  type: 'AggregatePermission',
  args: {
    where: 'PermissionWhereInput',
    orderBy: list('PermissionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PermissionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.permission.aggregate({ ...args, ...select }) as any
  },
})
