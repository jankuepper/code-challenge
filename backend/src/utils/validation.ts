import { isANumber } from "./isNumber";
import { isAString } from "./isString";

// could use https://zod.dev/ here instead but thats one more dependency
export function isValidContractBody(body: any) {
  // for a bit more readability those if-statements are separated
  if (typeof body !== "object") return false;
  if (!isAString(body.name) || !isAString(body.status)) return false;
  console.log(body);
  if (body["user_id"] && !isANumber(body.user_id)) return false;
  return true;
}
