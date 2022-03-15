import { queryField, nonNull, list } from 'nexus'

export const UserFindManyQuery = queryField('findManyUser', {
  type: nonNull(list(nonNull('User'))),
  args: {
    where: 'UserWhereInput',
    orderBy: list('UserOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'UserWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('UserScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.user.findMany({
      ...args,
      ...select,
    })
  },
})
