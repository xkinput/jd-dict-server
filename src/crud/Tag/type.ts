import { objectType } from 'nexus'

export const Tag = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Tag',
  description: `标签
用于搜索关联词条`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.string('name')
    t.list.field('phrases', {
      type: 'Phrase',
      args: {
        where: 'PhraseWhereInput',
        orderBy: 'PhraseOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'PhraseWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PhraseScalarFieldEnum',
      },
      resolve(root: any) {
        return root.phrases
      },
    })
    t.field('_count', {
      type: 'TagCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
