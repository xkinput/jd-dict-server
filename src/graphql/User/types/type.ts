import { inputObjectType, nonNull, objectType } from 'nexus'

export enum UserRole {
  ROOT = 'R:ROOT',
  MANAGER = 'R:MANAGER',
  CLIENT = 'R:CLIENT',
}

export const UserLogin = objectType({
  name: 'UserLogin',
  definition(t) {
    t.string('token')
  }
})

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('password')
  }
})

export const UserSignUpInput = inputObjectType({
  name: 'UserSignUpInput',
  definition(t) {
    t.nonNull.string('name')
    t.string('nickname')
    t.nonNull.string('phone')
    t.nonNull.string('password')
  }
})

export const UserUpdateOneInput = inputObjectType({
  name: 'UserUpdateOneInput',
  definition(t) {
    t.field('nickname', {
      type: 'NullableStringFieldUpdateOperationsInput'
    })
    t.field('phone', {
      type: 'NullableStringFieldUpdateOperationsInput'
    })
    t.field('status', {
      type: 'EnumUserStatusFieldUpdateOperationsInput'
    })
    t.list.field('roleSet', {
      type: 'RoleWhereUniqueInput'
    })
  }
})

export const UserMeUpdateInput = inputObjectType({
  name: 'UserMeUpdateInput',
  definition(t) {
    t.field('nickname', {
      type: 'NullableStringFieldUpdateOperationsInput'
    })
    t.nonNull.string('password')
    t.string('newPassword')
    t.field('phone', {
      type: 'NullableStringFieldUpdateOperationsInput'
    })
  }
})
