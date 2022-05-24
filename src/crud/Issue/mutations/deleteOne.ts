import { mutationField, nonNull } from 'nexus'

export const IssueDeleteOneMutation = mutationField('deleteOneIssue', {
  type: 'Issue',
  args: {
    where: nonNull('IssueWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.issue.delete({
      where,
      ...select,
    })
  },
})
