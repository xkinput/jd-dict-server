import { queryField } from 'nexus'

export const testQuery = queryField('testQuery', {
  type: 'String',
  resolve(_parent, {}, { prisma, select }) {
    return ''
  },
})
