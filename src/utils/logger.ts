import { Request, Response } from "express";

export default function (req: Request, res: Response, next) {
  console.log(new Date());
  console.log(`LOGGING FROM [${req.method}] ${req.url}`);

  console.log({
    query: req.query,
    body: req.body,
    params: req.params,
  });

  next();
}
