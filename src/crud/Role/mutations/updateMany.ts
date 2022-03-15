import { mutationField, nonNull } from 'nexus'

export const RoleUpdateManyMutation = mutationField('updateManyRole', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('RoleUpdateManyMutationInput'),
    where: 'RoleWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.role.updateMany(args as any)
  },
})
