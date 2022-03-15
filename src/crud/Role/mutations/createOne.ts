import { mutationField, nonNull } from 'nexus'

export const RoleCreateOneMutation = mutationField('createOneRole', {
  type: nonNull('Role'),
  args: {
    data: nonNull('RoleCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.role.create({
      data,
      ...select,
    })
  },
})
