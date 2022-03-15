import { mutationField, nonNull } from 'nexus'

export const RoleUpsertOneMutation = mutationField('upsertOneRole', {
  type: nonNull('Role'),
  args: {
    where: nonNull('RoleWhereUniqueInput'),
    create: nonNull('RoleCreateInput'),
    update: nonNull('RoleUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.role.upsert({
      ...args,
      ...select,
    })
  },
})
