import { UserRole } from './../types/type'
import { ApolloError } from 'apollo-server-koa'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { mutationField, nonNull } from 'nexus'

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    data: nonNull('UserUpdateOneInput'),
    where: nonNull('UserWhereUniqueInput')
  },
  async resolve(_, { where, data }, { prisma, casbin, ctx, select }) {
    let { roleSet, ...mergeData } = data

    let user = await prisma.user.findUnique({
      include: {
        roles: true
      },
      where,
      rejectOnNotFound(e) {
        throw new ApolloError('未找到用户')
      }
    })

    if (user.roles.some(it => it.value === UserRole.ROOT)) {
      throw new Error('禁止修改初始管理员')
    }

    let setRoles = await prisma.role.findMany({
      where: {
        OR: roleSet.map(it => ({
          id: it.id,
          name: it.name,
          value: it.value,
        }))
      }
    })

    if (setRoles.some(it => it.value === UserRole.ROOT)) {
      throw new Error('禁止设置修改初始管理员')
    }

    if (setRoles?.length) {
      await casbin.e.removeFilteredGroupingPolicy(0, user.name)
      await casbin.e.addGroupingPolicies(setRoles.map(it => [user.name, it.value]))
    }

    return prisma.user.update({
      where,
      data: {
        ...mergeData,
        ...(setRoles?.length && {
          roles: {
            set: setRoles.map(it => ({
              id: it.id,
            }))
          },
        })
      },
      ...select
    })
  }
})

export const updateUserMe = mutationField('updateUserMe', {
  type: 'User',
  args: {
    data: nonNull('UserMeUpdateInput'),
  },
  async resolve(_, { data }, { prisma, casbin, ctx, select }) {
    let { password, newPassword, ...mergeData } = data

    let user = await prisma.user.findUnique({
      where: {
        id: ctx.state.user.id
      },
      rejectOnNotFound(e) {
        throw new ApolloError('未找到用户')
      }
    })

    if (!compareSync(password, user.password)) throw new ApolloError('密码不正确')

    const hashNewPassword = data.newPassword && hashSync(data.newPassword, genSaltSync(12))

    return prisma.user.update({
      where: {
        id: ctx.state.user.id
      },
      data: {
        ...mergeData,
        ...(hashNewPassword && {
          password: {
            set: hashNewPassword
          }
        })
      },
      ...select
    })
  }
})
