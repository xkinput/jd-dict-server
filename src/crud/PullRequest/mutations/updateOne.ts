import { mutationField, nonNull } from 'nexus'

export const PullRequestUpdateOneMutation = mutationField(
  'updateOnePullRequest',
  {
    type: nonNull('PullRequest'),
    args: {
      data: nonNull('PullRequestUpdateInput'),
      where: nonNull('PullRequestWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pullRequest.update({
        where,
        data,
        ...select,
      })
    },
  },
)
