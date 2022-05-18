import { queryField, nonNull, list } from 'nexus'

export const PullRequestFindCountQuery = queryField(
  'findManyPullRequestCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PullRequestWhereInput',
      orderBy: list('PullRequestOrderByWithRelationAndSearchRelevanceInput'),
      cursor: 'PullRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PullRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pullRequest.count(args as any)
    },
  },
)
