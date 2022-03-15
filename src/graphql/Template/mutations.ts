import { mutationField, nonNull } from 'nexus'

export const testMutation = mutationField('testMutation', {
  type: 'String',
  resolve(_parent, {}, { prisma, select }) {
    return ''
  },
})
