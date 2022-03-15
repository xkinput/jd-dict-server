import { queryField, nonNull } from 'nexus'

export const WechatFindUniqueQuery = queryField('findUniqueWechat', {
  type: 'Wechat',
  args: {
    where: nonNull('WechatWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.wechat.findUnique({
      where,
      ...select,
    })
  },
})
