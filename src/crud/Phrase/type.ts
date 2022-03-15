import { objectType } from 'nexus'

export const Phrase = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Phrase',
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.string('word')
    t.string('code')
    t.list.field('comments', {
      type: 'Comment',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'CommentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.comments
      },
    })
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
    t.field('_count', {
      type: 'PhraseCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
