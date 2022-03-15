import { queryField, list } from 'nexus'

export const RoleAggregateQuery = queryField('aggregateRole', {
  type: 'AggregateRole',
  args: {
    where: 'RoleWhereInput',
    orderBy: list('RoleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'RoleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.role.aggregate({ ...args, ...select }) as any
  },
})
