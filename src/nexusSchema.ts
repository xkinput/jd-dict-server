import { makeSchema } from 'nexus'
import { paljs } from '@paljs/nexus'
import { validatePlugin } from 'nexus-validate'

import * as gTypes from './crud'
import * as types from './graphql'
import * as ScalarTypes from './scalars'

export const schema = makeSchema({
  types: [
    gTypes,
    types,
    ScalarTypes
  ],
  plugins: [
    paljs(),
    validatePlugin(),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? {
        module: __dirname + '/context.ts',
        export: 'Context',
      }
      : undefined,
})
