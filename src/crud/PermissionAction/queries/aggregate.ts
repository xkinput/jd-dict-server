import { queryField, list } from 'nexus'

export const PermissionActionAggregateQuery = queryField(
  'aggregatePermissionAction',
  {
    type: 'AggregatePermissionAction',
    args: {
      where: 'PermissionActionWhereInput',
      orderBy: list(
        'PermissionActionOrderByWithRelationAndSearchRelevanceInput',
      ),
      cursor: 'PermissionActionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.permissionAction.aggregate({ ...args, ...select }) as any
    },
  },
)
