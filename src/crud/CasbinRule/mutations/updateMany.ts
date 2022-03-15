import { mutationField, nonNull } from 'nexus'

export const CasbinRuleUpdateManyMutation = mutationField(
  'updateManyCasbinRule',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CasbinRuleUpdateManyMutationInput'),
      where: 'CasbinRuleWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.casbinRule.updateMany(args as any)
    },
  },
)
