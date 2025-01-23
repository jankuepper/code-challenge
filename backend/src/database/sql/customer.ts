import { db } from "..";
import { Contract } from "./contract";

export type User = {
  id: Number;
  username: String;
  email: String;
  password: String;
  type: "customer";
};

export function createUser(args: {
  $username: String;
  $email: String;
  $password: String;
  $type: "customer";
}) {
  const createUserSQL = `INSERT INTO user (username, email, password, type) VALUES ($username, $email, $password, $type)`;
  return db.prepare(createUserSQL).run(args as any);
}

export function getAllCustomers() {
  const queryAllCustomerSQL = `SELECT * FROM user WHERE type = 'customer'`;
  return db.prepare(queryAllCustomerSQL).all() as User[] | [];
}

export function getCustomerById(args: { $id: Number }) {
  const customerByIdSQL = `SELECT * FROM user WHERE id = $id AND type = 'customer'`;
  return db.prepare(customerByIdSQL).get(args as any) as User | {};
}

export function getAllContractsFromCustomer(args: { $id: Number }) {
  const queryAllContractsFromCustomerById = `SELECT contract.id, contract.name, contract.status, contract.user_id
                                             FROM contract 
                                             LEFT JOIN user 
                                               ON contract.user_id = user.id 
                                             WHERE user.id = $id`;
  return db.prepare(queryAllContractsFromCustomerById).all(args as any) as
    | Contract
    | [];
}

export function getContractFromCustomer(args: {
  $userId: Number;
  $contractId: Number;
}) {
  const queryContractByIdFromCustomerById = `SELECT contract.id, contract.name, contract.status, contract.user_id 
                                             FROM contract
                                             LEFT JOIN user 
                                               ON contract.user_id = user.id AND contract.id = $contractId
                                             WHERE user.id = $userId`;
  return db
    .prepare(queryContractByIdFromCustomerById)
    .get(args as any) as Contract;
}
