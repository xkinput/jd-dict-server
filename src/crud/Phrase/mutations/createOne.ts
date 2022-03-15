import { mutationField, nonNull } from 'nexus'

export const PhraseCreateOneMutation = mutationField('createOnePhrase', {
  type: nonNull('Phrase'),
  args: {
    data: nonNull('PhraseCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.phrase.create({
      data,
      ...select,
    })
  },
})
