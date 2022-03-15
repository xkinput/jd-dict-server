import { config } from 'dotenv'
import { resolve } from 'path'

let envName = (process.env?.NODE_ENV && `.${process.env.NODE_ENV}`) || ''

config({
  path: resolve(__dirname, '../../prisma/', '.env')
})
if (envName) {
  config({
    path: resolve(__dirname, '../../prisma/', `.env${envName}`)
  })
}
