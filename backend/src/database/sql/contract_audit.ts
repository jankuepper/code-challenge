import { db } from "..";
import { Contract } from "./contract";

export function getAllContractAudits() {
  const queryAllContractSQL = `SELECT * FROM contract_audit`;
  try {
    const result = db.prepare(queryAllContractSQL).all() as Contract[] | [];
    return { success: true, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}
