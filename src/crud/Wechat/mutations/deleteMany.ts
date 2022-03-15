import { mutationField, nonNull } from 'nexus'

export const WechatDeleteManyMutation = mutationField('deleteManyWechat', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'WechatWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.wechat.deleteMany({ where } as any)
  },
})
