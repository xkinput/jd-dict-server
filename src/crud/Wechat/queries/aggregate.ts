import { queryField, list } from 'nexus'

export const WechatAggregateQuery = queryField('aggregateWechat', {
  type: 'AggregateWechat',
  args: {
    where: 'WechatWhereInput',
    orderBy: list('WechatOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'WechatWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.wechat.aggregate({ ...args, ...select }) as any
  },
})
