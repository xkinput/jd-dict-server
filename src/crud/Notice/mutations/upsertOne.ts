import { mutationField, nonNull } from 'nexus'

export const NoticeUpsertOneMutation = mutationField('upsertOneNotice', {
  type: nonNull('Notice'),
  args: {
    where: nonNull('NoticeWhereUniqueInput'),
    create: nonNull('NoticeCreateInput'),
    update: nonNull('NoticeUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notice.upsert({
      ...args,
      ...select,
    })
  },
})
