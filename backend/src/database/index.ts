import { DatabaseSync } from "node:sqlite";
import { createContractTable, createUserTable } from "./sql/init";
import { createUser, getAllCustomers } from "./sql/customer";
import { createContract, getAllContracts } from "./sql/contract";

export const db = new DatabaseSync("./db.sqlite");

export function initializeDb() {
  createUserTable();
  createContractTable();

  if (getAllCustomers().result?.length === 0) {
    populateDBwithUsers(25, "customer");
  }
  if (getAllContracts().result?.length === 0) {
    const userAmount = getAllCustomers().result?.length ?? 0;
    // this is intentional since ids start at 1
    for (let i = 1; i < userAmount; i++) {
      populateDBwithContracts(5, i);
    }
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

function populateDBwithContracts(amountPerUser: number, userId: number) {
  for (let i = 0; i < amountPerUser; i++) {
    createContract({
      $name: `Test Contract ${i}`,
      $status: "open",
      $user_id: userId,
    });
  }
}
