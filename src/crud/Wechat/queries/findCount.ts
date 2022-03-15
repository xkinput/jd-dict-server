import { queryField, nonNull, list } from 'nexus'

export const WechatFindCountQuery = queryField('findManyWechatCount', {
  type: nonNull('Int'),
  args: {
    where: 'WechatWhereInput',
    orderBy: list('WechatOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'WechatWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('WechatScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.wechat.count(args as any)
  },
})
