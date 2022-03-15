import { queryField, list } from 'nexus'

export const CasbinRuleFindFirstQuery = queryField('findFirstCasbinRule', {
  type: 'CasbinRule',
  args: {
    where: 'CasbinRuleWhereInput',
    orderBy: list('CasbinRuleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'CasbinRuleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CasbinRuleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.casbinRule.findFirst({
      ...args,
      ...select,
    })
  },
})
