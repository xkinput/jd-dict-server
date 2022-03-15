import { mutationField, nonNull } from 'nexus'

export const NoticeCreateOneMutation = mutationField('createOneNotice', {
  type: nonNull('Notice'),
  args: {
    data: nonNull('NoticeCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.notice.create({
      data,
      ...select,
    })
  },
})
