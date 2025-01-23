import { DatabaseSync } from "node:sqlite";
import { addUserSQL, initSQL } from "./sql/init";
import { queryAllCustomerSQL } from "./sql/customer";

export const db = new DatabaseSync("./db.sqlite");

export function initializeDb() {
  db.exec(initSQL);

  if (db.prepare(queryAllCustomerSQL).all().length === 0) {
    populateDBwithUsers(25, "customer");
  }
}

function populateDBwithUsers(amount: number, type: "admin" | "customer") {
  console.log("executed");
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
