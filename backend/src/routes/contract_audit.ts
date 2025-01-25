import { Request, Response } from "express";
import {
  getAllContractAudits,
  getContractAuditsById,
} from "../database/sql/contract_audit";
import { isANumber } from "../utils/isNumber";

export function getContractAuditsRoute(_req: Request, res: Response) {
  const result = getAllContractAudits();
  res.json(result);
}

export function getContractAuditRoute(
  { params: { id } }: Request,
  res: Response
) {
  let result = {};
  if (isANumber(id)) {
    result = getContractAuditsById({ $id: Number(id) });
  }
  res.json(result);
}
