import { queryField, list } from 'nexus'

export const PullRequestAggregateQuery = queryField('aggregatePullRequest', {
  type: 'AggregatePullRequest',
  args: {
    where: 'PullRequestWhereInput',
    orderBy: list('PullRequestOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PullRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pullRequest.aggregate({ ...args, ...select }) as any
  },
})
