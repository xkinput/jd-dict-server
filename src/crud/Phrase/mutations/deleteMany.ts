import { mutationField, nonNull } from 'nexus'

export const PhraseDeleteManyMutation = mutationField('deleteManyPhrase', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PhraseWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.phrase.deleteMany({ where } as any)
  },
})
