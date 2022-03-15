import { queryField, list } from 'nexus'

export const NoticeAggregateQuery = queryField('aggregateNotice', {
  type: 'AggregateNotice',
  args: {
    where: 'NoticeWhereInput',
    orderBy: list('NoticeOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'NoticeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notice.aggregate({ ...args, ...select }) as any
  },
})
