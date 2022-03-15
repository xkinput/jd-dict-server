import { mutationField, nonNull } from 'nexus'

export const NoticeDeleteManyMutation = mutationField('deleteManyNotice', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'NoticeWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.notice.deleteMany({ where } as any)
  },
})
