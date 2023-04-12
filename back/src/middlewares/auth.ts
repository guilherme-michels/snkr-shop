import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  const secret = "mysecret";

  if (token == null) {
    return res.status(403).end();
  }

  // Efetuando a validação do JWT:
  const decoded = jwt.verify(token, secret);
  console.log(`decoded`, decoded);

  return res.status(200).end();
};
