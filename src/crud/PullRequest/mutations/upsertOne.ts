import { mutationField, nonNull } from 'nexus'

export const PullRequestUpsertOneMutation = mutationField(
  'upsertOnePullRequest',
  {
    type: nonNull('PullRequest'),
    args: {
      where: nonNull('PullRequestWhereUniqueInput'),
      create: nonNull('PullRequestCreateInput'),
      update: nonNull('PullRequestUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pullRequest.upsert({
        ...args,
        ...select,
      })
    },
  },
)
