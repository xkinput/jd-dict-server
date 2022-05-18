import { queryField, list } from 'nexus'

export const PullRequestFindFirstQuery = queryField('findFirstPullRequest', {
  type: 'PullRequest',
  args: {
    where: 'PullRequestWhereInput',
    orderBy: list('PullRequestOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PullRequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PullRequestScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pullRequest.findFirst({
      ...args,
      ...select,
    })
  },
})
