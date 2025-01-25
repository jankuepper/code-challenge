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

export function createContractAuditTable() {
  const createContractAuditTable = `
        CREATE TABLE IF NOT EXISTS contract_audit (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contract_id INTEGER NOT NULL,
          new_name TEXT NOT NULL,
          old_name TEXT NOT NULL,
          new_status TEXT NOT NULL,
          old_status TEXT NOT NULL,
          new_user_id INTEGER,
          old_user_id INTEGER,
          audit_action TEXT NOT NULL,
          audit_date DATE NOT NULL
        )`;
  try {
    db.exec(createContractAuditTable);
    return { success: true, errors: [] };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e] };
  }
}
// won't add after delete trigger since no delete functionality
export function createContractUpdateTrigger() {
  const trigger = `
        CREATE TRIGGER IF NOT EXISTS contract_audit_after_update
          AFTER UPDATE ON contract
          WHEN new.name <> old.name
            OR new.status <> old.status
            OR new.user_id <> old.user_id
        BEGIN 
          INSERT INTO contract_audit (
            contract_id,
            new_name,
            old_name,
            new_status,
            old_status,
            new_user_id,
            old_user_id,
            audit_action,
            audit_date
          )
        VALUES (
            old.id,
            new.name,
            old.name,
            new.status,
            old.status,
            new.user_id,
            old.user_id,
            'update',
            DATETIME('NOW')
          );
        END`;
  try {
    db.exec(trigger);
    return { success: true, errors: [] };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e] };
  }
}
