import { casbinAdapter } from '@/plugin/casbin'
import { UserRole } from '../User'

export async function getRoleForName(name: string) {
  const e = await casbinAdapter.create()

  const isRoleRoot = await e.hasRoleForUser(name, UserRole.ROOT)
  const isRoleManager = await e.hasRoleForUser(name, UserRole.MANAGER)
  /** 是管理员或ROOT角色 */
  const isRoleManagerOrRoot = isRoleManager || isRoleRoot
  const roles = await e.getRolesForUser(name)
  /** 是管理员或ROOT角色 */
  const isManagerRole = isRoleManager || isRoleRoot

  return {
    e,
    isRoleRoot,
    isRoleManager,
    isRoleManagerOrRoot,
    isManagerRole,
    roles
  }
}
