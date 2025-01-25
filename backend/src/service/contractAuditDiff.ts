import { isANumber } from "../utils/isNumber";
import { getContractAuditsById } from "../database/sql/contract_audit";

// turns { new_<property_name>: <new_value>, old_<property_name>: <old_value> }
// into { <property_name>: { old: <old_value>, new: <new_value> } }
// for easier display
export function handleContractAuditDiff(id: string) {
  let diff: Record<string, any> = {};
  if (isANumber(id)) {
    const { result } = getContractAuditsById({ $id: Number(id) });
    if (result) {
      const resultClone: Record<string, any> = result;
      const newValues = Object.keys(resultClone)
        .filter((key) => key.includes("new_"))
        .sort();
      const oldValues = Object.keys(resultClone)
        .filter((key) => key.includes("old_"))
        .sort();
      if (newValues.length !== oldValues.length) {
        return { success: false, errors: ["Invalid data structure."] };
      }
      diff = {};
      for (let i = 0; i < newValues.length; i++) {
        if (resultClone[newValues[i]] === resultClone[oldValues[i]]) continue;
        diff[newValues[i].replace("new_", "")] = {
          new: resultClone[newValues[i]],
          old: resultClone[oldValues[i]],
        };
      }
    }
  }
  return diff;
}
