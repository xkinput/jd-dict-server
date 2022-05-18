import { queryField, nonNull, list } from 'nexus'

export const PullRequestFindManyQuery = queryField('findManyPullRequest', {
  type: nonNull(list(nonNull('PullRequest'))),
  args: {
    where: 'PullRequestWhereInput',
    orderBy: list('PullRequestOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PullRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PullRequestScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pullRequest.findMany({
      ...args,
      ...select,
    })
  },
})
