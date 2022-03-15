import { objectType } from 'nexus'

export const CasbinRule = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CasbinRule',
  definition(t) {
    t.int('id')
    t.string('ptype')
    t.nullable.string('v0')
    t.nullable.string('v1')
    t.nullable.string('v2')
    t.nullable.string('v3')
    t.nullable.string('v4')
    t.nullable.string('v5')
  },
})
