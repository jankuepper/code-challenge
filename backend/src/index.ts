import express, { Request, Response } from "express";
import { db, initializeDb } from "./database";
import {
  queryAllCustomerSQL,
  customerByIdSQL,
  queryAllContractsFromCustomerById,
  queryContractByIdFromCustomerById,
} from "./database/sql/customer";
import {
  queryAllContractSQL,
  queryContractById,
} from "./database/sql/contract";

const app = express();
initializeDb();

app.get("/customers", (_req: Request, res: Response) => {
  const result = db.prepare(queryAllCustomerSQL).all();
  res.json(result);
});
app.get("/customers/:id", (req: Request, res: Response) => {
  const result = db.prepare(customerByIdSQL).get({ $id: req.params.id });
  res.json(result);
});
app.get("/customers/:id/contracts", (req: Request, res: Response) => {
  const result = db
    .prepare(queryAllContractsFromCustomerById)
    .all({ $id: req.params.id });
  res.json(result);
});
app.get(
  "/customers/:id/contracts/:contract_id",
  (req: Request, res: Response) => {
    const result = db
      .prepare(queryContractByIdFromCustomerById)
      .all({ $userId: req.params.id, $contractId: req.params.contract_id });
    res.json(result);
  }
);
app.get("/contracts", (_req: Request, res: Response) => {
  const result = db.prepare(queryAllContractSQL).all();
  res.json(result);
});
app.get("/contracts/:id", (req: Request, res: Response) => {
  const result = db.prepare(queryContractById).get({ $id: req.params.id });
  res.json(result);
});

app.listen(3000, () => console.log("Started listening on port 3000"));
