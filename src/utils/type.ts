
type EnumType = { [s: number]: string }

export function mapEnum(enumerable: EnumType): any[] {
  return Object.keys(enumerable).map(key => enumerable[key])
}
