
export function noEmptyString(array: string[]): boolean {
  return !array.some(value => value === "");
}