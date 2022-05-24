import { queryField, list } from 'nexus'

export const IssueAggregateQuery = queryField('aggregateIssue', {
  type: 'AggregateIssue',
  args: {
    where: 'IssueWhereInput',
    orderBy: list('IssueOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'IssueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.issue.aggregate({ ...args, ...select }) as any
  },
})
