import { mutationField, nonNull } from 'nexus'

export const ActionUpdateOneMutation = mutationField('updateOneAction', {
  type: nonNull('Action'),
  args: {
    data: nonNull('ActionUpdateInput'),
    where: nonNull('ActionWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.action.update({
      where,
      data,
      ...select,
    })
  },
})
