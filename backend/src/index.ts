import express, { Request, Response } from "express";
import { db, initializeDb } from "./database";
import { queryAllCustomerSQL, customerByIdSQL } from "./database/sql/customer";

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
  // Todo
});
app.get("/customers/:id/contracts/:id", (req: Request, res: Response) => {
  // Todo
});

app.listen(3000, () => console.log("Started listening on port 3000"));
