import { mutationField, nonNull } from 'nexus'

export const WechatUpsertOneMutation = mutationField('upsertOneWechat', {
  type: nonNull('Wechat'),
  args: {
    where: nonNull('WechatWhereUniqueInput'),
    create: nonNull('WechatCreateInput'),
    update: nonNull('WechatUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.wechat.upsert({
      ...args,
      ...select,
    })
  },
})
