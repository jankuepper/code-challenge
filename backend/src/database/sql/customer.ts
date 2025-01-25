import { db } from "..";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  type: "customer";
  salt: string;
};

export function createUser(args: {
  $username: string;
  $email: string;
  $password: string;
  $type: "customer";
  $salt: string;
}) {
  const createUserSQL = `INSERT INTO user (username, email, password, type, salt) VALUES ($username, $email, $password, $type, $salt)`;

  try {
    const result = db.prepare(createUserSQL).run(args as any);
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function getAllCustomers() {
  const queryAllCustomerSQL = `SELECT id, username, email, type FROM user WHERE type = 'customer'`;
  try {
    const result = db.prepare(queryAllCustomerSQL).all() as User[] | [];
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function getCustomerById(args: { $id: number }) {
  const customerByIdSQL = `SELECT id, username, email, type FROM user WHERE id = $id AND type = 'customer'`;
  try {
    const result = db.prepare(customerByIdSQL).get(args as any) as User | {};
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function internalGetCustomerByUsername(args: { $username: string }) {
  const customerByIdSQL = `SELECT * FROM user WHERE username = $username AND type = 'customer'`;
  try {
    const result = db.prepare(customerByIdSQL).get(args as any) as User | {};
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}
