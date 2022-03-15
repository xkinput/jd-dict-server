import { UserStatus } from '@prisma/client'

export const UserStatusData = [
  { status: UserStatus.DISABLE, msg: '限制登录', desc: '您的账户已被限制登录，请联系管理员了解其详细阻止原因。' },
  { status: UserStatus.ENABLE, msg: '正常' }
]
