import { mutationField, nonNull } from 'nexus'

export const WechatCreateOneMutation = mutationField('createOneWechat', {
  type: nonNull('Wechat'),
  args: {
    data: nonNull('WechatCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.wechat.create({
      data,
      ...select,
    })
  },
})
