import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headerPayload = req.header("Authorization");
  if (!headerPayload) {
    res
      .status(401)
      .json({ success: false, errors: ["Access denied. No token provided."] });
    return next("router");
  }
  try {
    req.username = validateToken(headerPayload.replace("Bearer ", ""));
    next();
  } catch (err) {
    res.status(400).json({ success: false, errors: ["Invalid token."] });
    next("router");
  }
}
