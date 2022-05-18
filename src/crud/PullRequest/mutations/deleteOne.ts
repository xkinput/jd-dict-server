import { mutationField, nonNull } from 'nexus'

export const PullRequestDeleteOneMutation = mutationField(
  'deleteOnePullRequest',
  {
    type: 'PullRequest',
    args: {
      where: nonNull('PullRequestWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pullRequest.delete({
        where,
        ...select,
      })
    },
  },
)
