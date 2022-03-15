import { shield, deny, allow, IRules, or } from 'graphql-shield'
import { isCanPolicy, isAuthenticated } from './rules'
import { NexusGenFieldTypes, NexusGenObjectNames } from '@/generated/nexus'
import { ApolloError } from 'apollo-server-koa'

type PermissionsSchema = IRules & {
  [k in NexusGenObjectNames]?: Partial<Record<keyof NexusGenFieldTypes[k] | '*', IRules>>;
};

const ruleTree: PermissionsSchema = {
  Query: {
    '*': deny,
    findUserMe: isAuthenticated,
    findUniqueUser: isCanPolicy(['user', 'read']),
    findUniqueRole: isCanPolicy(['role', 'read']),
    findUniquePermission: isCanPolicy(['permission', 'read']),
    findUniquePermissionAction: isCanPolicy(['permissionAction', 'read']),
    findManyUser: isCanPolicy(['user', 'read']),
    findManyUserCount: isCanPolicy(['user', 'read']),
    findManyRole: isCanPolicy(['role', 'read']),
    findManyRoleCount: isCanPolicy(['role', 'read']),
    findMePermissions: isAuthenticated,
    findManyPermission: isCanPolicy(['permission', 'read']),
    findManyPermissionCount: isCanPolicy(['permission', 'read']),
    findManyPermissionAction: isCanPolicy(['permissionAction', 'read']),
    findManyPermissionActionCount: isCanPolicy(['permissionAction', 'read']),
    findUserPermissions: isCanPolicy(['userPermission', 'read']),
    findRolePermissions: isCanPolicy(['userPermission', 'read']),
  },
  Mutation: {
    '*': deny,
    login: allow,
    signUp: allow,
    addUserPermission: isCanPolicy(['userPermission', 'create']),
    createOneRole: isCanPolicy(['role', 'create']),
    createOnePermission: isCanPolicy(['permission', 'create']),
    createOnePermissionAction: isCanPolicy(['permissionAction', 'create']),
    updateUser: isCanPolicy(['user', 'update']),
    updateUserMe: isAuthenticated,
    updateOnePermission: isCanPolicy(['permission', 'update']),
    updateOnePermissionAction: isCanPolicy(['permissionAction', 'update']),
    deleteOnePermission: isCanPolicy(['permission', 'delete']),
    deleteOnePermissionAction: isCanPolicy(['permissionAction', 'delete']),
    deleteOneUser: isCanPolicy(['user', 'delete']),
    deletePolicy: isCanPolicy(['userPermission', 'delete']),
  },
}

export const permissions = shield(ruleTree, {
  allowExternalErrors: true,
  debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  fallbackRule: allow,
  fallbackError: async (thrownThing, parent, args, context: any, info) => {
    if (thrownThing instanceof ApolloError) {
      return thrownThing
    } else if (thrownThing instanceof Error) {
      console.error(thrownThing)
      return thrownThing
    } else {
      if (context.ctx.state?.jwtOriginalError) {
        throw context.ctx.state.jwtOriginalError
      }
      console.error('The resolver threw something that is not an error.')
      console.log('context.ctx: ', context.ctx)
      console.error(thrownThing)
      return new ApolloError('Internal server error')
    }
  }
})
