import { mutationField, nonNull } from 'nexus'

export const PhraseUpdateOneMutation = mutationField('updateOnePhrase', {
  type: nonNull('Phrase'),
  args: {
    data: nonNull('PhraseUpdateInput'),
    where: nonNull('PhraseWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.phrase.update({
      where,
      data,
      ...select,
    })
  },
})
