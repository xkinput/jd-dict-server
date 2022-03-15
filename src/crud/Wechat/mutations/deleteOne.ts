import { mutationField, nonNull } from 'nexus'

export const WechatDeleteOneMutation = mutationField('deleteOneWechat', {
  type: 'Wechat',
  args: {
    where: nonNull('WechatWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.wechat.delete({
      where,
      ...select,
    })
  },
})
