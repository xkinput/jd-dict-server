import Koa from 'koa'
import koaJwt from 'koa-jwt'
import { ApolloServer } from 'apollo-server-koa'
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core'
import { graphqlUploadKoa } from 'graphql-upload'
import fs from 'fs'
import http, { Server } from 'http'
import https from 'https'
import jwt from 'jsonwebtoken'
import { execute, subscribe } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import '@/env'
import { createContext } from './context'
import { schema } from './nexusSchema'
import { APP_PORT } from './config/keys'
import { permissions } from './shield/permissions'
import { prisma } from './context'

async function start() {
  const app = new Koa()

  app.use(
    graphqlUploadKoa({
      maxFileSize: 1000 * 1024 * 100, // 100 MB
      maxFiles: 20,
    })
  )

  let applySchema = applyMiddleware(schema, permissions)

  const apolloServer = new ApolloServer({
    schema: applySchema,
    introspection: true,
    context: createContext,
    parseOptions: {
      experimentalFragmentVariables: true,
    },
    plugins: [
      ...(process.env.NODE_ENV === 'production' ? [ApolloServerPluginLandingPageDisabled()] : [])
    ]
  })

  app.use(koaJwt({
    secret: process.env.APP_JWT_SECRET,
    passthrough: true,
    debug: process.env.NODE_ENV !== 'production'
  }))


  let httpServer: Server
  if (process.env.NODE_ENV === 'production' && 0) {
    httpServer = https.createServer(
      {
        key: fs.readFileSync('./config/cert/server.key'),
        cert: fs.readFileSync('./config/cert/server.cert')
      },
      app.callback(),
    )
  } else {
    httpServer = http.createServer(app.callback())
  }

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  SubscriptionServer.create(
    {
      schema, execute, subscribe,
      async onConnect(connectionParams, webSocket) {
        if (connectionParams.authorization) {
          let user = jwt.decode(connectionParams.authorization)
          return { ctx: { state: { user } }, prisma }
        }
        throw new Error('未找到Token')
      },
    },
    { server: httpServer, path: '/subscriptions' }
  )

  httpServer.listen(APP_PORT, '0.0.0.0')

  console.log(` 🚀 Server ready at: http://localhost:${APP_PORT}${apolloServer.graphqlPath}`)
}

start()

