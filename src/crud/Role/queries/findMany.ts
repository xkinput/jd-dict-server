import { queryField, nonNull, list } from 'nexus'

export const RoleFindManyQuery = queryField('findManyRole', {
  type: nonNull(list(nonNull('Role'))),
  args: {
    where: 'RoleWhereInput',
    orderBy: list('RoleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'RoleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RoleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.role.findMany({
      ...args,
      ...select,
    })
  },
})
