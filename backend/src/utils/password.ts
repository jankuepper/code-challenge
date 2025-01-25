import { pbkdf2Sync, randomBytes } from "node:crypto";

const iterations = 100000;
const keyLen = 64;
const digest = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLen,
    digest
  ).toString("hex");
  return { hashedPassword, salt };
}

export function validatePassword(password: string, hash: string, salt: string) {
  const hashedPassword = pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLen,
    digest
  ).toString("hex");
  return hashedPassword === hash;
}
