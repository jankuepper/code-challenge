import { Request, Response } from "express";
import { getAllContracts, getContractById } from "../database/sql/contract";
import { isANumber } from "../utils/isNumber";

export function getContractsRoute(_req: Request, res: Response) {
  const result = getAllContracts();
  res.json(result);
}

export function getContractRoute({ params: { id } }: Request, res: Response) {
  let result = {};
  if (isANumber(id)) {
    result = getContractById({ $id: Number(id) });
  }
  res.json(result);
}
