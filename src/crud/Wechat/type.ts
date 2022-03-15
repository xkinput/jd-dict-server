import { objectType } from 'nexus'

export const Wechat = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Wechat',
  definition(t) {
    t.int('id')
    t.string('openid')
    t.nullable.string('unionid')
    t.nullable.string('avatarUrl')
    t.nullable.string('city')
    t.nullable.string('country')
    t.nullable.int('gender')
    t.nullable.string('language')
    t.nullable.string('nickName')
    t.nullable.string('province')
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
  },
})
