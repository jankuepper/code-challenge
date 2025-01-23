import express, { Request, Response } from "express";
const app = express();

app.get("/customers", (req: Request, res: Response) => {
  // Todo
});
app.get("/customers/:id", (req: Request, res: Response) => {
  // Todo
});
app.get("/customers/:id/contracts", (req: Request, res: Response) => {
  // Todo
});
app.get("/customers/:id/contracts/:id", (req: Request, res: Response) => {
  // Todo
});

app.listen(3000, () => console.log("Started listening on port 3000"));
