import { objectType } from 'nexus'

export const PullRequest = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PullRequest',
  description: `词条-拉取请求`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.string('content')
    t.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
    t.field('action', {
      type: 'Action',
      resolve(root: any) {
        return root.action
      },
    })
    t.int('actionId')
    t.field('status', { type: 'PullRequestStatus' })
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
      type: 'PullRequestCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
