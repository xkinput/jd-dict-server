import { queryField, nonNull } from 'nexus'

export const IssueFindUniqueQuery = queryField('findUniqueIssue', {
  type: 'Issue',
  args: {
    where: nonNull('IssueWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.issue.findUnique({
      where,
      ...select,
    })
  },
})
