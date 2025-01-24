// could use https://zod.dev/ here instead but thats one more dependency
export function isANumber(string: any) {
  if (typeof string === "number") return true;
  return !!(string.trim() !== "" && !Number.isNaN(Number(string)));
}
