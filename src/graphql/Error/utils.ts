import { ErrorData } from './data'

export function transformErrorCode() {
  return Object.keys(ErrorData).reduce((p, n) => ((p[n] = n), p), {}) as {
    [key in keyof typeof ErrorData]: key
  }
}

export function transformErrorMember() {
  let v = Object.entries(ErrorData).map(([k, v]) => ({
    name: k,
    value: k,
    description: v,
  }))
  return v
}
