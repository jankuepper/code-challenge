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
  try {
    const result = db.exec(createUserTable);
    return { success: true, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
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
  try {
    db.exec(createContractTable);
    return { success: true, errors: [] };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e] };
  }
}
