import { DatabaseSync } from "node:sqlite";
import { createContractTable, createUserTable } from "./sql/init";
import { createUser, getAllCustomers } from "./sql/customer";
import { createContract, getAllContracts } from "./sql/contract";

export const db = new DatabaseSync("./db.sqlite");

export function initializeDb() {
  createUserTable();
  createContractTable();

  if (getAllCustomers().length === 0) {
    populateDBwithUsers(25, "customer");
  }
  if (getAllContracts().length === 0) {
    createContract({
      $name: "Contract",
      $status: "approved",
      $user_id: 1,
    });
    createContract({
      $name: "test2",
      $status: "open",
      $user_id: 1,
    });
    createContract({
      $name: "Test Contract",
      $status: "open",
      $user_id: 2,
    });
  }
}

function populateDBwithUsers(amount: number, type: "customer") {
  for (let i = 0; i < amount; i++) {
    createUser({
      $username: `test${i}`,
      $email: `testemail${i}`,
      $password: "password",
      $type: type,
    });
  }
}
