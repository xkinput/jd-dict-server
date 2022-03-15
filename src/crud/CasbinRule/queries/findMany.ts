import { queryField, nonNull, list } from 'nexus'

export const CasbinRuleFindManyQuery = queryField('findManyCasbinRule', {
  type: nonNull(list(nonNull('CasbinRule'))),
  args: {
    where: 'CasbinRuleWhereInput',
    orderBy: list('CasbinRuleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'CasbinRuleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CasbinRuleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.casbinRule.findMany({
      ...args,
      ...select,
    })
  },
})
