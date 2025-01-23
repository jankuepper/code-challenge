import { db } from "..";

export function createUserTable() {
  // TODO: add back UNIQUE constraint to email
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    )`;
  return db.exec(createUserTable);
}
export function createContractTable() {
  const createContractTable = `
        CREATE TABLE IF NOT EXISTS contract (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        user_id INTEGER, 
        FOREIGN KEY (user_id) REFERENCES user(id)
    )`;
  return db.exec(createContractTable);
}
