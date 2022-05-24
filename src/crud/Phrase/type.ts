import { objectType } from 'nexus'

export const Phrase = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Phrase',
  description: `词条`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.string('word', { description: `词条` })
    t.string('code', { description: `编码` })
    t.field('type', { description: '类型', type: 'PhraseType' })
    t.int('index', { description: `词频` })
    t.field('status', { description: '状态', type: 'PhraseStatus' })
    t.list.field('comments', {
      description: '评论',
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
      description: '发起人',
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
    t.list.field('tags', {
      description: '标签',
      type: 'Tag',
      args: {
        where: 'TagWhereInput',
        orderBy: 'TagOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'TagWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'TagScalarFieldEnum',
      },
      resolve(root: any) {
        return root.tags
      },
    })
    t.list.field('pullRequests', {
      description: '关联PR',
      type: 'PullRequest',
      args: {
        where: 'PullRequestWhereInput',
        orderBy: 'PullRequestOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'PullRequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PullRequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.pullRequests
      },
    })
    t.field('_count', {
      type: 'PhraseCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
