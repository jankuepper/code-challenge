import { Request, Response } from "express";
import { getAllCustomers, getCustomerById } from "../database/sql/customer";
import { isANumber } from "../utils/isNumber";
import {
  getAllContractsFromCustomer,
  getContractFromCustomer,
  updateContractFromCustomer,
} from "../database/sql/contract";
import { isValidContractBody } from "../utils/validation";

export function getCustomersRoute(_req: Request, res: Response) {
  const result = getAllCustomers();
  res.json(result);
}

export function getCustomerRoute({ params: { id } }: Request, res: Response) {
  let result = {};
  if (isANumber(id)) {
    result = getCustomerById({ $id: Number(id) });
  }
  res.json(result);
}

export function getCustomerContractsRoute(
  { params: { id } }: Request,
  res: Response
) {
  let result = {};
  if (isANumber(id)) {
    result = getAllContractsFromCustomer({ $id: Number(id) });
  }
  res.json(result);
}

export function getCustomerContractRoute(
  { params: { id, contract_id } }: Request,
  res: Response
) {
  let result = {};
  if (isANumber(id) && isANumber(contract_id)) {
    result = getContractFromCustomer({
      $userId: Number(id),
      $contractId: Number(contract_id),
    });
  }
  res.json(result);
}

export function putCustomerContractRoute(
  { params: { id, contract_id }, body }: Request,
  res: Response
) {
  let result = {};
  if (isANumber(id) && isANumber(contract_id) && isValidContractBody(body)) {
    result = updateContractFromCustomer({
      $userId: Number(id),
      $contractId: Number(contract_id),
      body,
    });
  }
  res.json(result);
}
