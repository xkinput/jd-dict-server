import { queryField, nonNull, list } from 'nexus'

export const NoticeFindManyQuery = queryField('findManyNotice', {
  type: nonNull(list(nonNull('Notice'))),
  args: {
    where: 'NoticeWhereInput',
    orderBy: list('NoticeOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'NoticeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('NoticeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notice.findMany({
      ...args,
      ...select,
    })
  },
})
