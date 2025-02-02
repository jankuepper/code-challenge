import { DatabaseSync } from "node:sqlite";
import {
  createContractAuditTable,
  createContractTable,
  createContractUpdateTrigger,
  createUserTable,
} from "./sql/init";
import { createUser, getAllCustomers } from "./sql/customer";
import { createContract, getAllContracts } from "./sql/contract";
import { hashPassword } from "../utils/password";

export const db = new DatabaseSync("./db.sqlite");

// TODO: Maybe implement RETURNING for some statements
export function initializeDb() {
  createUserTable();
  createContractTable();
  createContractAuditTable();
  createContractUpdateTrigger();

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
  // intentional so it corresponds with the id
  for (let i = 1; i < amount; i++) {
    const { hashedPassword, salt } = hashPassword("password");
    createUser({
      $username: `test${i}`,
      $email: `testemail${i}@test.com`,
      $password: hashedPassword,
      $type: type,
      $salt: salt,
    });
  }
}

function populateDBwithContracts(amountPerUser: number, userId: number) {
  // intentional so it corresponds with the id
  for (let i = 1; i < amountPerUser; i++) {
    createContract({
      $name: `Test Contract ${i}`,
      $status: "open",
      $user_id: userId,
    });
  }
}
