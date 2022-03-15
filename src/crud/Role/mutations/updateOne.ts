import { mutationField, nonNull } from 'nexus'

export const RoleUpdateOneMutation = mutationField('updateOneRole', {
  type: nonNull('Role'),
  args: {
    data: nonNull('RoleUpdateInput'),
    where: nonNull('RoleWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.role.update({
      where,
      data,
      ...select,
    })
  },
})
