import { queryField, nonNull } from 'nexus'

export const RoleFindUniqueQuery = queryField('findUniqueRole', {
  type: 'Role',
  args: {
    where: nonNull('RoleWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.role.findUnique({
      where,
      ...select,
    })
  },
})
