import { isANumber } from "./isNumber";
import { isAString } from "./isString";

// TODO: throw error when user is not allowed to edit, currently just returns success

// could use https://zod.dev/ here instead but thats one more dependency
export function isValidContractBody(body: any) {
  // for a bit more readability those if-statements are separated
  if (typeof body !== "object") return false;
  if (!isAString(body.name) || !isAString(body.status)) return false;
  if (body["user_id"] && !isANumber(body.user_id)) return false;
  return true;
}
