export function isANumber(string: any) {
  if (string.trim() !== "" && !Number.isNaN(Number(string))) {
    return true;
  }
  return false;
}
