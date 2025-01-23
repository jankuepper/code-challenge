import express, { Request, Response } from "express";
import { db, initializeDb } from "./database";
import {
  getAllCustomers,
  getCustomerById,
  getAllContractsFromCustomer,
  getContractFromCustomer,
} from "./database/sql/customer";
import { getAllContracts, getContractById } from "./database/sql/contract";
import { isANumber } from "./utils/isNumber";

const app = express();
initializeDb();

app.get("/customers", (_req: Request, res: Response) => {
  const result = getAllCustomers();
  res.json(result);
});

app.get("/customers/:id", ({ params: id }, res: Response) => {
  let result = {};
  if (isANumber(id)) {
    result = getCustomerById({ $id: Number(id) });
  }
  res.json(result);
});

app.get("/customers/:id/contracts", ({ params: { id } }, res: Response) => {
  let result = {};
  if (isANumber(id)) {
    result = getAllContractsFromCustomer({ $id: Number(id) });
  }
  res.json(result);
});

app.get(
  "/customers/:id/contracts/:contract_id",
  ({ params: { id, contract_id } }, res: Response) => {
    let result = {};
    if (isANumber(id) && isANumber(contract_id)) {
      result = getContractFromCustomer({
        $userId: Number(id),
        $contractId: Number(contract_id),
      });
    }
    res.json(result);
  }
);

app.get("/contracts", (_req: Request, res: Response) => {
  const result = getAllContracts();
  res.json(result);
});

app.get("/contracts/:id", ({ params: { id } }, res: Response) => {
  let result = {};
  if (isANumber(id)) {
    result = getContractById({ $id: Number(id) });
  }
  res.json(result);
});

app.listen(3000, () => console.log("Started listening on port 3000"));
