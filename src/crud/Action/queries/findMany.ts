import { queryField, nonNull, list } from 'nexus'

export const ActionFindManyQuery = queryField('findManyAction', {
  type: nonNull(list(nonNull('Action'))),
  args: {
    where: 'ActionWhereInput',
    orderBy: list('ActionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'ActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.action.findMany({
      ...args,
      ...select,
    })
  },
})
