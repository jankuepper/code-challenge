import { Response, Request } from "express";
import { handleLogin } from "../service/login";

export function loginRoute({ body }: Request, res: Response) {
  res.json(handleLogin(body, res));
}
