import { queryField, nonNull, list } from 'nexus'

export const PhraseFindCountQuery = queryField('findManyPhraseCount', {
  type: nonNull('Int'),
  args: {
    where: 'PhraseWhereInput',
    orderBy: list('PhraseOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PhraseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PhraseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.phrase.count(args as any)
  },
})
