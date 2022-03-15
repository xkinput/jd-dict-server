import { queryField, nonNull, list } from 'nexus'

export const PhraseFindManyQuery = queryField('findManyPhrase', {
  type: nonNull(list(nonNull('Phrase'))),
  args: {
    where: 'PhraseWhereInput',
    orderBy: list('PhraseOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PhraseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PhraseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.phrase.findMany({
      ...args,
      ...select,
    })
  },
})
