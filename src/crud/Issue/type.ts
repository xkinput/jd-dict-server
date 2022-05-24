import { objectType } from 'nexus'

export const Issue = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Issue',
  description: `词条-发起讨论问题`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.string('content')
    t.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
    t.boolean('status')
    t.list.field('pullRequests', {
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
    t.field('_count', {
      type: 'IssueCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
