import { inputObjectType, list } from 'nexus'

export const IssueUserCreateInput = inputObjectType({
  name: 'IssueUserCreateInput',
  definition(t) {
    t.nonNull.string('content', {
      description: '内容'
    })
    t.nonNull.field('pullRequests', {
      description: '操作',
      type: list('IssuePullReqeustUserInput')
    })
  }
})

export const IssuePullReqeustUserInput = inputObjectType({
  name: 'IssuePullReqeustUserInput',
  definition(t) {
    t.nonNull.field('pullRequestType', {
      type: 'PullRequestType',
      description: 'PR操作行为',
    })
    t.string('word', {
      description: '词条'
    })
    t.string('code', {
      description: '编码'
    })
    t.int('index', {
      description: '排序值'
    })
    t.field('phraseType', {
      type: 'PhraseType',
      description: '词条类型'
    })
    t.field('tags', {
      type: list('TagWhereUniqueInput'),
      description: '标签类'
    })
    t.int('phraseId', {
      description: '原词条ID，若为新建，则忽略'
    })
    t.int('_prIndex', {
      description: '辅助返回错误信息编号'
    })
  }
})
