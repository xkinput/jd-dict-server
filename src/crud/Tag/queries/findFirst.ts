import { queryField, list } from 'nexus'

export const TagFindFirstQuery = queryField('findFirstTag', {
  type: 'Tag',
  args: {
    where: 'TagWhereInput',
    orderBy: list('TagOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'TagWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('TagScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.tag.findFirst({
      ...args,
      ...select,
    })
  },
})
