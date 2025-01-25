import { Response } from "express";
import { isAString } from "../utils/isString";

export function handleLogin(
  body: { username: string; password: string },
  res: Response
) {
  const { username, password } = body;
  if (
    !body ||
    !("username" in body && "password" in body) ||
    !isAString(username) ||
    !isAString(password)
  ) {
    res.sendStatus(422);
    return;
  }
}
