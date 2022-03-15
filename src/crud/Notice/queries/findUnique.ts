import { queryField, nonNull } from 'nexus'

export const NoticeFindUniqueQuery = queryField('findUniqueNotice', {
  type: 'Notice',
  args: {
    where: nonNull('NoticeWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.notice.findUnique({
      where,
      ...select,
    })
  },
})
