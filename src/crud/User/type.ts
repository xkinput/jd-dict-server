import { objectType } from 'nexus'

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'User',
  description: `用户`,
  definition(t) {
    t.int('id')
    t.field('createAt', { type: 'DateTime' })
    t.field('updateAt', { type: 'DateTime' })
    t.nullable.string('name')
    t.nullable.string('nickname')
    t.nullable.string('phone')
    t.field('status', { type: 'UserStatus' })
    t.list.field('roles', {
      type: 'Role',
      args: {
        where: 'RoleWhereInput',
        orderBy: 'RoleOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'RoleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RoleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.roles
      },
    })
    t.field('signUpType', { type: 'SignUpType' })
    t.nullable.field('wechat', {
      type: 'Wechat',
      resolve(root: any) {
        return root.wechat
      },
    })
    t.nullable.int('wechatId')
    t.list.field('notices', {
      type: 'Notice',
      args: {
        where: 'NoticeWhereInput',
        orderBy: 'NoticeOrderByWithRelationAndSearchRelevanceInput',
        cursor: 'NoticeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'NoticeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.notices
      },
    })
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
    t.list.field('issues', {
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
        return root.issues
      },
    })
    t.list.field('likePullReqeusts', {
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
        return root.likePullReqeusts
      },
    })
    t.list.field('dislikePullReqeusts', {
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
        return root.dislikePullReqeusts
      },
    })
    t.field('_count', {
      type: 'UserCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
