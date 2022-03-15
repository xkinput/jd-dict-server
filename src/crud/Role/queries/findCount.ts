import { queryField, nonNull, list } from 'nexus'

export const RoleFindCountQuery = queryField('findManyRoleCount', {
  type: nonNull('Int'),
  args: {
    where: 'RoleWhereInput',
    orderBy: list('RoleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'RoleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('RoleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.role.count(args as any)
  },
})
