import { queryField, nonNull } from 'nexus'

export const PhraseFindUniqueQuery = queryField('findUniquePhrase', {
  type: 'Phrase',
  args: {
    where: nonNull('PhraseWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.phrase.findUnique({
      where,
      ...select,
    })
  },
})
