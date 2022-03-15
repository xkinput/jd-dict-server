import { list, nonNull, queryField } from 'nexus'

export const findMePermissions = queryField('findMePermissions', {
  type: list(list('String')),
  async resolve(_parent, {}, { prisma, select, casbin, ctx }) {
    let roles = await casbin.e.getImplicitPermissionsForUser(ctx.state.user.name)
    return roles
  },
})

export const findRolePermissions = queryField('findRolePermissions', {
  type: list(list('String')),
  args: {
    value: nonNull('String'),
  },
  async resolve(_parent, { value }, { prisma, casbin }) {
    let roles = await casbin.e.getImplicitPermissionsForUser(value)
    return roles
  },
})

export const findUserPermissions = queryField('findUserPermissions', {
  type: list(list('String')),
  args: {
    where: nonNull('UserWhereUniqueInput'),
  },
  async resolve(_parent, { where }, { prisma, casbin }) {
    let user = await prisma.user.findUnique({
      where,
      rejectOnNotFound(e) {
        throw new Error('未找到用户')
      }
    })
    let roles = await casbin.e.getImplicitPermissionsForUser(user.name)
    return roles
  },
})
