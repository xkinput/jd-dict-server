import { queryField, nonNull, list } from 'nexus'

export const CasbinRuleFindCountQuery = queryField('findManyCasbinRuleCount', {
  type: nonNull('Int'),
  args: {
    where: 'CasbinRuleWhereInput',
    orderBy: list('CasbinRuleOrderByWithRelationAndSearchRelevanceInput'),
    cursor: 'CasbinRuleWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CasbinRuleScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.casbinRule.count(args as any)
  },
})
