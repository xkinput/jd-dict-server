import { queryField, nonNull, list } from 'nexus'

export const IssueFindCountQuery = queryField('findManyIssueCount', {
  type: nonNull('Int'),
  args: {
    where: 'IssueWhereInput',
    orderBy: list('IssueOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'IssueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('IssueScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.issue.count(args as any)
  },
})
