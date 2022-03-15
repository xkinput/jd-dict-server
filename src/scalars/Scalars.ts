
import {
  JSONObjectResolver,
  DateResolver,
  TimeResolver,
  LocalTimeResolver,
} from 'graphql-scalars'
import { GraphQLUpload } from 'graphql-upload'
import { asNexusMethod } from 'nexus'

export const Upload = GraphQLUpload
export const JSONObject = asNexusMethod(JSONObjectResolver, 'json')
export const Date = asNexusMethod(DateResolver, 'date')
export const Time = asNexusMethod(TimeResolver, 'Time')
export const LocalTime = asNexusMethod(LocalTimeResolver, 'LocalTime')
