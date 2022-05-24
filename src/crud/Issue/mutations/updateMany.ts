import { mutationField, nonNull } from 'nexus'

export const IssueUpdateManyMutation = mutationField('updateManyIssue', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('IssueUpdateManyMutationInput'),
    where: 'IssueWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.issue.updateMany(args as any)
  },
})
