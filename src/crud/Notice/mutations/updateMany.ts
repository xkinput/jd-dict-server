import { mutationField, nonNull } from 'nexus'

export const NoticeUpdateManyMutation = mutationField('updateManyNotice', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('NoticeUpdateManyMutationInput'),
    where: 'NoticeWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.notice.updateMany(args as any)
  },
})
