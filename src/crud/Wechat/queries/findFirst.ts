import { queryField, list } from 'nexus'

export const WechatFindFirstQuery = queryField('findFirstWechat', {
  type: 'Wechat',
  args: {
    where: 'WechatWhereInput',
    orderBy: list('WechatOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'WechatWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('WechatScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.wechat.findFirst({
      ...args,
      ...select,
    })
  },
})
