import { DatabaseSync } from "node:sqlite";
import {
  addContractSQL,
  addUserSQL,
  createContractTable,
  createUserTable,
} from "./sql/init";
import { queryAllCustomerSQL } from "./sql/customer";
import { queryAllContractSQL } from "./sql/contract";

export const db = new DatabaseSync("./db.sqlite");

export function initializeDb() {
  db.exec(createUserTable);
  db.exec(createContractTable);

  if (db.prepare(queryAllCustomerSQL).all().length === 0) {
    populateDBwithUsers(25, "customer");
  }
  if (db.prepare(queryAllContractSQL).all().length === 0) {
    db.prepare(addContractSQL).run({
      $name: "Contract",
      $status: "approved",
      $user_id: 1,
    });
    db.prepare(addContractSQL).run({
      $name: "test2",
      $status: "open",
      $user_id: 1,
    });
    db.prepare(addContractSQL).run({
      $name: "Test Contract",
      $status: "open",
      $user_id: 2,
    });
  }
}

function populateDBwithUsers(amount: number, type: "customer") {
  const statement = db.prepare(addUserSQL);
  for (let i = 0; i < amount; i++) {
    statement.run({
      $username: `test${i}`,
      $email: `testemail${i}`,
      $password: "password",
      $type: type,
    });
  }
}
