import { mutationField, nonNull } from 'nexus'

export const CasbinRuleDeleteOneMutation = mutationField(
  'deleteOneCasbinRule',
  {
    type: 'CasbinRule',
    args: {
      where: nonNull('CasbinRuleWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.casbinRule.delete({
        where,
        ...select,
      })
    },
  },
)
