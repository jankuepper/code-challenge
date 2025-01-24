import { db } from "..";
import { Contract } from "./contract";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  type: "customer";
};

export function createUser(args: {
  $username: string;
  $email: string;
  $password: string;
  $type: "customer";
}) {
  const createUserSQL = `INSERT INTO user (username, email, password, type) VALUES ($username, $email, $password, $type)`;

  try {
    const result = db.prepare(createUserSQL).run(args as any);
    return { success: true, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function getAllCustomers() {
  const queryAllCustomerSQL = `SELECT * FROM user WHERE type = 'customer'`;
  try {
    const result = db.prepare(queryAllCustomerSQL).all() as User[] | [];
    return { success: true, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function getCustomerById(args: { $id: number }) {
  const customerByIdSQL = `SELECT * FROM user WHERE id = $id AND type = 'customer'`;
  try {
    const result = db.prepare(customerByIdSQL).get(args as any) as User | {};
    return { success: true, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}
