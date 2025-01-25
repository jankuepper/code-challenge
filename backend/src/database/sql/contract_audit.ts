import { db } from "..";

export function getAllContractAudits() {
  const queryAllContractAuditsSQL = `SELECT * FROM contract_audit`;
  try {
    // TODO: type
    const result = db.prepare(queryAllContractAuditsSQL).all();
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}

export function getContractAuditsById(args: { $id: number }) {
  const queryContractAuditById = `SELECT * 
                               FROM contract_audit
                               WHERE contract_id = $id`;
  try {
    // TODO: type
    const result = db.prepare(queryContractAuditById).get(args as any);
    return { success: !!result, errors: undefined, result };
  } catch (e) {
    console.error(e);
    return { success: false, errors: [e], result: undefined };
  }
}
