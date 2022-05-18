import { objectType } from 'nexus'

export const Action = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Action',
  description: `词条-操作
记录如何去调整一个词条`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.field('phrase', {
      type: 'Phrase',
      resolve(root: any) {
        return root.phrase
      },
    })
    t.int('phraseId')
    t.string('word')
    t.string('code')
    t.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.int('userId')
    t.field('type', { type: 'ActionType' })
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
    t.field('_count', {
      type: 'ActionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
