import { objectType } from 'nexus'

export const Notice = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Notice',
  description: `通知`,
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('content')
    t.field('createdAt', { type: 'DateTime' })
    t.nullable.field('publishAt', { type: 'DateTime' })
    t.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
  },
})
