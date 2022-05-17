import { objectType } from 'nexus'

export const PermissionAction = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PermissionAction',
  description: `权限-权限操作`,
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.list.field('permissions', {
      type: 'Permission',
      args: {
        where: 'PermissionWhereInput',
        orderBy: 'PermissionOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'PermissionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PermissionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.permissions
      },
    })
    t.field('_count', {
      type: 'PermissionActionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
