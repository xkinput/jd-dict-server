import { mutationField, nonNull } from 'nexus'

export const ActionCreateOneMutation = mutationField('createOneAction', {
  type: nonNull('Action'),
  args: {
    data: nonNull('ActionCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.action.create({
      data,
      ...select,
    })
  },
})
