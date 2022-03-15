import { queryField, list } from 'nexus'

export const CasbinRuleAggregateQuery = queryField('aggregateCasbinRule', {
  type: 'AggregateCasbinRule',
  args: {
    where: 'CasbinRuleWhereInput',
    orderBy: list('CasbinRuleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'CasbinRuleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.casbinRule.aggregate({ ...args, ...select }) as any
  },
})
