// TODO: add back UNIQUE constraint to email
export const initSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    )`;

export const addUserSQL = `INSERT INTO users (username, email, password, type) VALUES ($username, $email, $password, $type)`;
