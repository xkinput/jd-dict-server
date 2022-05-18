import { mutationField, nonNull } from 'nexus'

export const PullRequestCreateOneMutation = mutationField(
  'createOnePullRequest',
  {
    type: nonNull('PullRequest'),
    args: {
      data: nonNull('PullRequestCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pullRequest.create({
        data,
        ...select,
      })
    },
  },
)
