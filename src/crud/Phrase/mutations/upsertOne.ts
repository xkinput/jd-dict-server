import { mutationField, nonNull } from 'nexus'

export const PhraseUpsertOneMutation = mutationField('upsertOnePhrase', {
  type: nonNull('Phrase'),
  args: {
    where: nonNull('PhraseWhereUniqueInput'),
    create: nonNull('PhraseCreateInput'),
    update: nonNull('PhraseUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.phrase.upsert({
      ...args,
      ...select,
    })
  },
})
