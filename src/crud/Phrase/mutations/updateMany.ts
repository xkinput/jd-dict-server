import { mutationField, nonNull } from 'nexus'

export const PhraseUpdateManyMutation = mutationField('updateManyPhrase', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PhraseUpdateManyMutationInput'),
    where: 'PhraseWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.phrase.updateMany(args as any)
  },
})
