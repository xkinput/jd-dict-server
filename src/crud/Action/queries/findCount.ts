import { queryField, nonNull, list } from 'nexus'

export const ActionFindCountQuery = queryField('findManyActionCount', {
  type: nonNull('Int'),
  args: {
    where: 'ActionWhereInput',
    orderBy: list('ActionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'ActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.action.count(args as any)
  },
})
