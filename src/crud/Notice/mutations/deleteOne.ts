import { mutationField, nonNull } from 'nexus'

export const NoticeDeleteOneMutation = mutationField('deleteOneNotice', {
  type: 'Notice',
  args: {
    where: nonNull('NoticeWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.notice.delete({
      where,
      ...select,
    })
  },
})
