import { objectType } from 'nexus'

export const PullRequest = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PullRequest',
  description: `词条-拉取请求
记录如何去调整一个词条`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.nullable.field('phrase', {
      type: 'Phrase',
      resolve(root: any) {
        return root.phrase
      },
    })
    t.nullable.int('phraseId')
    t.nullable.string('word')
    t.nullable.string('code')
    t.nullable.int('index')
    t.field('type', { type: 'PullRequestType' })
    t.field('status', { type: 'PullRequestStatus' })
    t.list.field('issue', {
      type: 'Issue',
      args: {
        where: 'IssueWhereInput',
        orderBy: 'IssueOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'IssueWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'IssueScalarFieldEnum',
      },
      resolve(root: any) {
        return root.issue
      },
    })
    t.list.field('likes', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.likes
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
