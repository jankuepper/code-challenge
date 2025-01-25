import { Response } from "express";
import { isAString } from "../utils/isString";
import { internalGetCustomerByUsername } from "../database/sql/customer";
import { validatePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

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
    res.status(422).json({ success: false, errors: ["Invalid body."] });
    return;
  }
  const user = internalGetCustomerByUsername({ $username: username });
  if (!user.success || !user.result || !("username" in user.result)) {
    res.status(404).json({ success: false, errors: ["User not found."] });
    return;
  }
  const isValidPassword = validatePassword(
    password,
    user.result.password,
    user.result.salt
  );
  if (!isValidPassword) {
    res.json({ success: false, errors: ["Invalid password."] });
    return;
  }
  const token = generateToken(username);
  res.json({ success: !!token, result: token });
}
