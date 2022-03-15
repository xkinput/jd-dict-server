import { objectType } from 'nexus'

export const Permission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Permission',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.list.field('actions', {
      type: 'PermissionAction',
      args: {
        where: 'PermissionActionWhereInput',
        orderBy: 'PermissionActionOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'PermissionActionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PermissionActionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.actions
      },
    })
    t.field('_count', {
      type: 'PermissionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
