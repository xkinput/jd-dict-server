import { queryField, nonNull, list } from 'nexus'

export const PermissionActionFindCountQuery = queryField(
  'findManyPermissionActionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PermissionActionWhereInput',
      orderBy: list(
        'PermissionActionOrderByWithRelationAndSearchRelevanceInput',
      ),
      cursor: 'PermissionActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PermissionActionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.permissionAction.count(args as any)
    },
  },
)
