import { mutationField, nonNull } from 'nexus'

export const IssueUpsertOneMutation = mutationField('upsertOneIssue', {
  type: nonNull('Issue'),
  args: {
    where: nonNull('IssueWhereUniqueInput'),
    create: nonNull('IssueCreateInput'),
    update: nonNull('IssueUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.issue.upsert({
      ...args,
      ...select,
    })
  },
})
