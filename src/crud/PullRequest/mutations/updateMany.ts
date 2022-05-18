import { mutationField, nonNull } from 'nexus'

export const PullRequestUpdateManyMutation = mutationField(
  'updateManyPullRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PullRequestUpdateManyMutationInput'),
      where: 'PullRequestWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pullRequest.updateMany(args as any)
    },
  },
)
