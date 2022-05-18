import { queryField, list } from 'nexus'

export const ActionFindFirstQuery = queryField('findFirstAction', {
  type: 'Action',
  args: {
    where: 'ActionWhereInput',
    orderBy: list('ActionOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'ActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.action.findFirst({
      ...args,
      ...select,
    })
  },
})
