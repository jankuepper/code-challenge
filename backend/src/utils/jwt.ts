import { sign, verify } from "jsonwebtoken";

// this is essentially treated as an all access token
// since there is only the update functionality no claims are used
export function generateToken(username: string) {
  return sign(username, `${process.env.JWT_SECRET}`, { expiresIn: "1800s" });
}

export function validateToken(token: string) {
  return verify(token, `${process.env.JWT_SECRET}`);
}
