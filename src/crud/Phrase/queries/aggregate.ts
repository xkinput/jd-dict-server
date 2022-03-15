import { queryField, list } from 'nexus'

export const PhraseAggregateQuery = queryField('aggregatePhrase', {
  type: 'AggregatePhrase',
  args: {
    where: 'PhraseWhereInput',
    orderBy: list('PhraseOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'PhraseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.phrase.aggregate({ ...args, ...select }) as any
  },
})
