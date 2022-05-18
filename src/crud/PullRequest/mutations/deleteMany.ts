import { mutationField, nonNull } from 'nexus'

export const PullRequestDeleteManyMutation = mutationField(
  'deleteManyPullRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PullRequestWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.pullRequest.deleteMany({ where } as any)
    },
  },
)
