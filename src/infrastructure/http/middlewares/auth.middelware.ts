import { NextFunction, Request, Response } from "express";
import { JWT } from "../../../adapters/jwt";
import { prisma } from "../../database/prisma-client";
import { UserEntity } from "../../../domain/entities/user.entity";

export class AuthMiddleware {
  static async valiadteJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "not token provided" });

    if (!authorization.startsWith("Bearer"))
      res.status(401).json({ error: "invalid bearer token" });

    try {
      const token = authorization.split(" ")[1] || "";

      const payload = await JWT.validateToken<{
        id: number;
        email: string;
      }>(token);

      if (!payload)
        return res.status(500).json({ error: "error validating token" });

      const user = await prisma.user.findFirst({
        where: {
          id: payload.id,
        },
      });

      if (!user) return res.status(400).json({ error: "user not exist" });

      if (!user.isValidated)
        return res.status(400).json({ error: "user not validated yet" });

      req.body.user = UserEntity.fromObjectWithoutPassword(user);

      next();
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
