import { Enforcer } from 'casbin'
import { PrismaClient } from '@prisma/client'
import { casbinAdapter } from './plugin/casbin'
import { getRoleForName } from '@/graphql/Role/utils'
import { SignUser } from './utils/user'

export let prisma: PrismaClient
if (!global.prisma) {
  global.prisma = new PrismaClient()
}
prisma = global.prisma
export interface Context {
  ctx?: {
    req?: any
    connection?: any
    state?: {
      user: SignUser
      [key: string]: any
    }
  }
  prisma: PrismaClient
  select: any
  casbin?: {
    e: Enforcer,
    getRoleForName: typeof getRoleForName
  }
}

export async function createContext({ ctx }): Promise<Context> {
  const enforcer = await casbinAdapter.create()

  return {
    ctx,
    prisma,
    select: {},
    casbin: {
      e: enforcer,
      getRoleForName,
    },
  }
}
