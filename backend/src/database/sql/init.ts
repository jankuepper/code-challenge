// TODO: add back UNIQUE constraint to email
export const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    )`;

export const createContractTable = `
        CREATE TABLE IF NOT EXISTS contract (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        user_id INTEGER, 
        FOREIGN KEY (user_id) REFERENCES user(id)
    )`;

export const addUserSQL = `INSERT INTO user (username, email, password, type) VALUES ($username, $email, $password, $type)`;
export const addContractSQL = `INSERT INTO contract (name, status, user_id) VALUES ($name, $status, $user_id)`;
