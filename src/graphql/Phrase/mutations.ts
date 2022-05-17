import { mutationField } from 'nexus'

export const CreateSubmitOnePhrase = mutationField('createSubmitOnePhrase', {
  type: 'Phrase',
  args: {
    data: 'SubmitOnePhraseCreateInput'
  },
  resolve(_parent, { data }, { prisma, select, ctx }) {
    return prisma.phrase.create({
      data: {
        ...data,
        userId: ctx.state.user.id,
      },
      ...select,
    })
  },
})
