export function entriesObjectStringify(obj: Object) {
  return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ')
}
