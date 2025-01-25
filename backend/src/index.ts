import express from "express";
import { initializeDb } from "./database";
import { json } from "body-parser";
import cors from "cors";
import { authMiddleware } from "./middleware/auth";
import {
  getCustomerContractRoute,
  getCustomerContractsRoute,
  getCustomerRoute,
  getCustomersRoute,
  putCustomerContractRoute,
} from "./routes/customer";
import { getContractRoute, getContractsRoute } from "./routes/contract";
import {
  getContractAuditRoute,
  getContractAuditsRoute,
} from "./routes/contract_audit";
import { loginRoute } from "./routes/login";

const app = express();
app.use(json());
app.use(cors());

initializeDb();

app.get("/customers", authMiddleware, getCustomersRoute);
app.get("/customers/:id", authMiddleware, getCustomerRoute);
app.get("/customers/:id/contracts", authMiddleware, getCustomerContractsRoute);
app.get(
  "/customers/:id/contracts/:contract_id",
  authMiddleware,
  getCustomerContractRoute
);
app.put(
  "/customers/:id/contracts/:contract_id",
  authMiddleware,
  putCustomerContractRoute
);

app.get("/contracts", authMiddleware, getContractsRoute);
app.get("/contracts/:id", authMiddleware, getContractRoute);

app.get("/contract_audits", authMiddleware, getContractAuditsRoute);
app.get("/contract_audits/:id", authMiddleware, getContractAuditRoute);

app.post("/login", loginRoute);

app.listen(3000, () => console.log("Started listening on port 3000"));
