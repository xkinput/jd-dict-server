import { mutationField, nonNull } from 'nexus'

export const WechatUpdateManyMutation = mutationField('updateManyWechat', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('WechatUpdateManyMutationInput'),
    where: 'WechatWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.wechat.updateMany(args as any)
  },
})
