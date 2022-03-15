import { mutationField, nonNull } from 'nexus'

export const PhraseDeleteOneMutation = mutationField('deleteOnePhrase', {
  type: 'Phrase',
  args: {
    where: nonNull('PhraseWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.phrase.delete({
      where,
      ...select,
    })
  },
})
