import { mutationField, nonNull } from 'nexus'

export const CasbinRuleCreateOneMutation = mutationField(
  'createOneCasbinRule',
  {
    type: nonNull('CasbinRule'),
    args: {
      data: nonNull('CasbinRuleCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.casbinRule.create({
        data,
        ...select,
      })
    },
  },
)
