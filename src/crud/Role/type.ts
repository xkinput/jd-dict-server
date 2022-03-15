import { objectType } from 'nexus'

export const Role = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Role',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.list.field('users', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.users
      },
    })
    t.field('_count', {
      type: 'RoleCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
