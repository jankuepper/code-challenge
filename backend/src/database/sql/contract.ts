import { db } from "..";
import { User } from "./customer";

type ContractStatus = "approved" | "open" | "closed";
export type Contract = {
  id: Number;
  name: Number;
  status: ContractStatus;
  user_id?: User["id"];
};

export function createContract(args: {
  $name: String;
  $status: String;
  $user_id: Number;
}) {
  const createContractSQL = `INSERT INTO contract (name, status, user_id) VALUES ($name, $status, $user_id)`;
  return db.prepare(createContractSQL).run(args as any);
}

export function getAllContracts() {
  const queryAllContractSQL = `SELECT * FROM contract`;
  return db.prepare(queryAllContractSQL).all() as Contract[] | [];
}

export function getContractById(args: { $id: Number }) {
  const queryContractById = `SELECT * FROM contract WHERE id = $id`;
  return db.prepare(queryContractById).get(args as any) as Contract | {};
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
  return db.prepare(queryContractByIdFromCustomerById).get(args as any) as
    | Contract
    | {};
}

export function updateContractFromCustomer(args: {
  $userId: Number;
  $contractId: Number;
  body: Contract;
}) {
  const updateContractFromCustomerSQL = `UPDATE contract
                                         SET name = $contractName, status = $contractStatus, user_id = $userId
                                         WHERE id = $contractId AND user_id = $validateUserId`;
  return db.prepare(updateContractFromCustomerSQL).get({
    $contractId: args.$contractId,
    $validateUserId: args.$userId,
    $contractName: args.body.name,
    $contractStatus: args.body.status,
    $userId: args.body?.user_id ?? null,
  } as any) as Contract | {};
}
