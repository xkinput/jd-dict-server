import { mutationField, nonNull } from 'nexus'

export const CasbinRuleUpsertOneMutation = mutationField(
  'upsertOneCasbinRule',
  {
    type: nonNull('CasbinRule'),
    args: {
      where: nonNull('CasbinRuleWhereUniqueInput'),
      create: nonNull('CasbinRuleCreateInput'),
      update: nonNull('CasbinRuleUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.casbinRule.upsert({
        ...args,
        ...select,
      })
    },
  },
)
