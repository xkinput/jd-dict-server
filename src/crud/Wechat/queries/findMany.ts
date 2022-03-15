import { queryField, nonNull, list } from 'nexus'

export const WechatFindManyQuery = queryField('findManyWechat', {
  type: nonNull(list(nonNull('Wechat'))),
  args: {
    where: 'WechatWhereInput',
    orderBy: list('WechatOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'WechatWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('WechatScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.wechat.findMany({
      ...args,
      ...select,
    })
  },
})
