import { mutationField, nonNull } from 'nexus'

export const ActionDeleteOneMutation = mutationField('deleteOneAction', {
  type: 'Action',
  args: {
    where: nonNull('ActionWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.action.delete({
      where,
      ...select,
    })
  },
})
