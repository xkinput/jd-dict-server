import { Context } from '@/context'
import { ApolloError } from 'apollo-server-koa'

export async function getUser({ ctx, prisma }: Context) {
  let userId = ctx.state?.user?.id
  if (!userId) throw new ApolloError('获取用户信息失败，请尝试重新登录')
  let user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    rejectOnNotFound: true
  })
  return user
}

export function lineToHump(str: string) {
  return str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
}

export function humpToLine(str: string) {
  return str.replace(/([A-Z]|\d+)/g, '_$1').toLowerCase()
}
