import { queryField, list } from 'nexus'

export const RoleFindFirstQuery = queryField('findFirstRole', {
  type: 'Role',
  args: {
    where: 'RoleWhereInput',
    orderBy: list('RoleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'RoleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RoleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.role.findFirst({
      ...args,
      ...select,
    })
  },
})
