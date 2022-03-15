import { resolve } from 'path'
import { newEnforcer } from 'casbin'
import { PrismaAdapter } from 'casbin-prisma-adapter'

import { Context } from '@/context'

export let casbinAdapter: {
  ctx?: Context['casbin']['e'],
  create: () => Promise<Context['casbin']['e']>,
} = {
  ctx: null,
  async create() {
    if (this.ctx) return this.ctx
    const a = await PrismaAdapter.newAdapter()
    let confName = resolve(__dirname, '../config/rbac_model.conf')
    const e = await newEnforcer(confName, a)
    this.ctx = e
    return e
  }
}
