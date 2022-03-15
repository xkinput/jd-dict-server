import { queryField, list } from 'nexus'

export const NoticeFindFirstQuery = queryField('findFirstNotice', {
  type: 'Notice',
  args: {
    where: 'NoticeWhereInput',
    orderBy: list('NoticeOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'NoticeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('NoticeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notice.findFirst({
      ...args,
      ...select,
    })
  },
})
