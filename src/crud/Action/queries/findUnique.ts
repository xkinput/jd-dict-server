import { queryField, nonNull } from 'nexus'

export const ActionFindUniqueQuery = queryField('findUniqueAction', {
  type: 'Action',
  args: {
    where: nonNull('ActionWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.action.findUnique({
      where,
      ...select,
    })
  },
})
