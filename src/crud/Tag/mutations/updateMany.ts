import { mutationField, nonNull } from 'nexus'

export const TagUpdateManyMutation = mutationField('updateManyTag', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('TagUpdateManyMutationInput'),
    where: 'TagWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.tag.updateMany(args as any)
  },
})
