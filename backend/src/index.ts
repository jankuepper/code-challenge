import express, { Request, Response } from "express";
import { initializeDb } from "./database";
import { getAllCustomers, getCustomerById } from "./database/sql/customer";
import {
  getAllContracts,
  getAllContractsFromCustomer,
  getContractById,
  getContractFromCustomer,
  updateContractFromCustomer,
} from "./database/sql/contract";
import { isANumber } from "./utils/isNumber";
import { isValidContractBody } from "./utils/validation";
import { json } from "body-parser";
import cors from "cors";
import {
  getAllContractAudits,
  getContractAuditsById,
} from "./database/sql/contract_audit";
import { handleLogin } from "./service/login";
import { authMiddleware } from "./middleware/auth";

const app = express();
app.use(json());
app.use(cors());

initializeDb();

app.get("/customers", (_req: Request, res: Response) => {
  const result = getAllCustomers();
  res.json(result);
});

app.get("/customers/:id", ({ params: { id } }, res: Response) => {
  let result = {};
  if (isANumber(id)) {
    result = getCustomerById({ $id: Number(id) });
  }
  res.json(result);
});

app.get(
  "/customers/:id/contracts",
  authMiddleware,
  ({ params: { id } }, res: Response) => {
    let result = {};
    if (isANumber(id)) {
      result = getAllContractsFromCustomer({ $id: Number(id) });
    }
    res.json(result);
  }
);

app.get(
  "/customers/:id/contracts/:contract_id",
  authMiddleware,
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

app.put(
  "/customers/:id/contracts/:contract_id",
  authMiddleware,
  ({ params: { id, contract_id }, body }, res) => {
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

app.get("/contract_audits", (_req: Request, res: Response) => {
  const result = getAllContractAudits();
  res.json(result);
});

app.get("/contract_audits/:id", ({ params: { id } }, res: Response) => {
  let result = {};
  if (isANumber(id)) {
    result = getContractAuditsById({ $id: Number(id) });
  }
  res.json(result);
});

app.post("/login", ({ body }, res: Response) => {
  res.json(handleLogin(body, res));
});

app.listen(3000, () => console.log("Started listening on port 3000"));
