import { inputObjectType, nonNull, objectType } from 'nexus'

export enum UserRole {
  ROOT = 'R:ROOT',
  MANAGER = 'R:MANAGER',
  NORMAL = 'R:NORMAL',
}

export const UserSignIn = objectType({
  name: 'UserSignIn',
  definition(t) {
    t.string('token')
  }
})

export const UserSignInInput = inputObjectType({
  name: 'UserSignInInput',
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
