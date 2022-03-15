import { mutationField, nonNull } from 'nexus'

export const CasbinRuleDeleteManyMutation = mutationField(
  'deleteManyCasbinRule',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CasbinRuleWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.casbinRule.deleteMany({ where } as any)
    },
  },
)
