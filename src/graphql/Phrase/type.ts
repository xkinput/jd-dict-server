import { inputObjectType } from 'nexus'

export const SubmitOnePhraseCreateInput = inputObjectType({
  name: 'SubmitOnePhraseCreateInput',
  definition(t) {
    t.nonNull.string('word')
    t.nonNull.string('code')
    t.int('index')
    t.field({
      type: 'PhraseType',
      name: 'type',
      description: '类型'
    })
  }
})
