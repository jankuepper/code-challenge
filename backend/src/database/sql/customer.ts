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
  return db.prepare(createUserSQL).run(args as any);
}

export function getAllCustomers() {
  const queryAllCustomerSQL = `SELECT * FROM user WHERE type = 'customer'`;
  return db.prepare(queryAllCustomerSQL).all() as User[] | [];
}

export function getCustomerById(args: { $id: number }) {
  const customerByIdSQL = `SELECT * FROM user WHERE id = $id AND type = 'customer'`;
  return db.prepare(customerByIdSQL).get(args as any) as User | {};
}
