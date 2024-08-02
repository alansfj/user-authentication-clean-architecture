import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  example = (req: Request, res: Response) => {
    res.json("example endpoint");
  };
}
