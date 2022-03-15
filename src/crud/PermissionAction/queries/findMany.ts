import { queryField, nonNull, list } from 'nexus'

export const PermissionActionFindManyQuery = queryField(
  'findManyPermissionAction',
  {
    type: nonNull(list(nonNull('PermissionAction'))),
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
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionAction.findMany({
        ...args,
        ...select,
      })
    },
  },
)
