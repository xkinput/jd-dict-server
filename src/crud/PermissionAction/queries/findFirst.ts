import { queryField, list } from 'nexus'

export const PermissionActionFindFirstQuery = queryField(
  'findFirstPermissionAction',
  {
    type: 'PermissionAction',
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
      return prisma.permissionAction.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
