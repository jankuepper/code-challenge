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
