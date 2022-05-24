import { queryField, list } from 'nexus'

export const IssueFindFirstQuery = queryField('findFirstIssue', {
  type: 'Issue',
  args: {
    where: 'IssueWhereInput',
    orderBy: list('IssueOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'IssueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('IssueScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.issue.findFirst({
      ...args,
      ...select,
    })
  },
})
