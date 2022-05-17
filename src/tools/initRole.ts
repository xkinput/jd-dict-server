import { casbinAdapter } from '@/plugin/casbin'
import { prisma } from '@/context'
import { UserRole } from '@/graphql'

async function start() {
  let roles: {
    name: string,
    value: UserRole
  }[] = [
    {
      name: '初始管理员',
      value: UserRole.ROOT
    },
    {
      name: '管理员',
      value: UserRole.MANAGER
    },
    {
      name: '用户',
      value: UserRole.NORMAL
    },
  ]
  await prisma.role.createMany({
    data: roles,
    skipDuplicates: true
  })
  const e = await casbinAdapter.create()
  const rules = [
    ['phrase:page', 'read'],
  ]
  for (let rule of rules) {
    await e.addPolicy(...[UserRole.ROOT, rule[0], rule[1]])
  }

  const initRules = [
    [UserRole.NORMAL, 'phrase', 'add'],
  ]
  for (let rule of initRules) {
    await e.addPolicy(...[rule[0], rule[1], rule[2]])
  }
}

start()
