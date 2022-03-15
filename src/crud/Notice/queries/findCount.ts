import { queryField, nonNull, list } from 'nexus'

export const NoticeFindCountQuery = queryField('findManyNoticeCount', {
  type: nonNull('Int'),
  args: {
    where: 'NoticeWhereInput',
    orderBy: list('NoticeOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'NoticeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('NoticeScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.notice.count(args as any)
  },
})
