export function isANumber(string: any) {
  return !!(string.trim() !== "" && !Number.isNaN(Number(string)));
}
