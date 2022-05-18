import { queryField, list } from 'nexus'

export const ActionAggregateQuery = queryField('aggregateAction', {
  type: 'AggregateAction',
  args: {
    where: 'ActionWhereInput',
    orderBy: list('ActionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'ActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.action.aggregate({ ...args, ...select }) as any
  },
})
