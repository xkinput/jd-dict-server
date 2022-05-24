import { queryField, nonNull, list } from 'nexus'

export const IssueFindManyQuery = queryField('findManyIssue', {
  type: nonNull(list(nonNull('Issue'))),
  args: {
    where: 'IssueWhereInput',
    orderBy: list('IssueOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'IssueWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('IssueScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.issue.findMany({
      ...args,
      ...select,
    })
  },
})
