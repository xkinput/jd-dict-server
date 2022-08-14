import { User, Prisma } from '@prisma/client'
import { chain, rule } from 'graphql-shield'
import { Context } from '@/context'
import { some } from 'lodash'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { ctx, prisma }: Context, info) => {
    if (ctx.state?.jwtOriginalError) {
      throw ctx.state.jwtOriginalError
    }
    let id = ctx.state.user?.id
    if (!id) return new Error('Not Authorised!')
    let user = await prisma.user.findUnique({
      where: {
        id,
      }
    })
    if (!user) {
      return new Error('Not Authorised!')
    } else {
      return true
    }
  }
)

export const isHasRole = (roles: string[]) => chain(isAuthenticated, rule({ cache: 'contextual' })(
  async (parent, args, { ctx, casbin }: Context, info) => {
    return some(roles, async role => {
      let user = ctx.state.user
      if (!await casbin.e.hasRoleForUser(`${user.opid || user.name}`, role)) {
        return new Error('Not Authorised!')
      } else {
        return true
      }
    })
  }
))

/**
 * 是否策略允许
 * @param policy 策略 顺序 [obj, act]
 */
export const isCanPolicy = (policy: string[]) => chain(isAuthenticated, rule({ cache: 'contextual' })(
  async (parent, args, { ctx, casbin }: Context, info) => {
    let user = ctx.state.user
    if (!await casbin.e.enforce(user?.name || user.opid, ...policy)) {
      return new Error('Not Authorised!')
    } else {
      return true
    }
  }
))
