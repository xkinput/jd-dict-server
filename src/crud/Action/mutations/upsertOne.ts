import { mutationField, nonNull } from 'nexus'

export const ActionUpsertOneMutation = mutationField('upsertOneAction', {
  type: nonNull('Action'),
  args: {
    where: nonNull('ActionWhereUniqueInput'),
    create: nonNull('ActionCreateInput'),
    update: nonNull('ActionUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.action.upsert({
      ...args,
      ...select,
    })
  },
})
