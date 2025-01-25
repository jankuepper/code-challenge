import { JwtPayload, sign, verify } from "jsonwebtoken";
import { isAString } from "./isString";

// this is essentially treated as an all access token
// since there is only the update functionality no claims are used
export function generateToken(username: string) {
  return sign({ username }, `${process.env.JWT_SECRET}`, {
    expiresIn: "1800s",
  });
}

export function validateToken(token: string) {
  return verify(token, `${process.env.JWT_SECRET}`);
}

export function refreshToken(token: string) {
  const payload = verify(token, `${process.env.JWT_SECRET}`);
  if (isAString(payload) || !("username" in payload)) {
    throw Error("Token is invalid.");
  }
  return generateToken(payload.username);
}
