import { queryField, list } from 'nexus'

export const PhraseFindFirstQuery = queryField('findFirstPhrase', {
  type: 'Phrase',
  args: {
    where: 'PhraseWhereInput',
    orderBy: list('PhraseOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PhraseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PhraseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.phrase.findFirst({
      ...args,
      ...select,
    })
  },
})
