import { enumType } from 'nexus'

import { transformErrorMember } from './utils'

export const ErrorCodeEnum = enumType({
  name: 'ErrorCode',
  members: transformErrorMember(),
  description: '错误码信息',
})
