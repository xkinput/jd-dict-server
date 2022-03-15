import { queryField, nonNull } from 'nexus'

export const CasbinRuleFindUniqueQuery = queryField('findUniqueCasbinRule', {
  type: 'CasbinRule',
  args: {
    where: nonNull('CasbinRuleWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.casbinRule.findUnique({
      where,
      ...select,
    })
  },
})
