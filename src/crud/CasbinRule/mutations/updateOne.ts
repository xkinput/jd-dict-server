import { mutationField, nonNull } from 'nexus'

export const CasbinRuleUpdateOneMutation = mutationField(
  'updateOneCasbinRule',
  {
    type: nonNull('CasbinRule'),
    args: {
      data: nonNull('CasbinRuleUpdateInput'),
      where: nonNull('CasbinRuleWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.casbinRule.update({
        where,
        data,
        ...select,
      })
    },
  },
)
