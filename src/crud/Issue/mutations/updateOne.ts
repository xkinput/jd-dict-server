import { mutationField, nonNull } from 'nexus'

export const IssueUpdateOneMutation = mutationField('updateOneIssue', {
  type: nonNull('Issue'),
  args: {
    data: nonNull('IssueUpdateInput'),
    where: nonNull('IssueWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.issue.update({
      where,
      data,
      ...select,
    })
  },
})
