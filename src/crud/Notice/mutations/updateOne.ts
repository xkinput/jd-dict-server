import { mutationField, nonNull } from 'nexus'

export const NoticeUpdateOneMutation = mutationField('updateOneNotice', {
  type: nonNull('Notice'),
  args: {
    data: nonNull('NoticeUpdateInput'),
    where: nonNull('NoticeWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.notice.update({
      where,
      data,
      ...select,
    })
  },
})
