import { mutationField, nonNull } from 'nexus'

export const IssueDeleteManyMutation = mutationField('deleteManyIssue', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'IssueWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.issue.deleteMany({ where } as any)
  },
})
