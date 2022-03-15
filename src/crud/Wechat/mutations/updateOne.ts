import { mutationField, nonNull } from 'nexus'

export const WechatUpdateOneMutation = mutationField('updateOneWechat', {
  type: nonNull('Wechat'),
  args: {
    data: nonNull('WechatUpdateInput'),
    where: nonNull('WechatWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.wechat.update({
      where,
      data,
      ...select,
    })
  },
})
