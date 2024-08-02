import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authController = new AuthController();

    router.get("/example", authController.example);

    return router;
  }
}
