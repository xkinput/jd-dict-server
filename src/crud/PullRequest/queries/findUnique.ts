import { queryField, nonNull } from 'nexus'

export const PullRequestFindUniqueQuery = queryField('findUniquePullRequest', {
  type: 'PullRequest',
  args: {
    where: nonNull('PullRequestWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pullRequest.findUnique({
      where,
      ...select,
    })
  },
})
