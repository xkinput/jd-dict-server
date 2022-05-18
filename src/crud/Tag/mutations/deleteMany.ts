import { mutationField, nonNull } from 'nexus'

export const TagDeleteManyMutation = mutationField('deleteManyTag', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'TagWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.tag.deleteMany({ where } as any)
  },
})
