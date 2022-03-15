import { arg, list, mutationField, nonNull } from 'nexus'

export const addUserPermission = mutationField('addUserPermission', {
  type: 'Boolean',
  args: {
    sub: nonNull('String'),
    permissions: arg({
      type: nonNull(list(nonNull('String'))),
      description: '顺序为 [obj, act]'
    }),
  },
  async resolve(_parent, { sub, permissions }, { casbin }) {
    return await casbin.e.addPermissionForUser(sub, ...permissions)
  },
})

export const deletePolicy = mutationField('deletePolicy', {
  type: 'Boolean',
  args: {
    rule: arg({
      type: nonNull(list(nonNull('String'))),
      description: '顺序为 [sub, obj, act]'
    }),
  },
  async resolve(_parent, { rule }, { casbin }) {
    return await casbin.e.removePolicy(...rule)
  },
})
