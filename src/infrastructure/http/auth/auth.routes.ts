import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "../../../domain/services/auth.service";
import { AuthRepository } from "../../repositories/auth.repository";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const authRepository = new AuthRepository();
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);

    router.post("/register", authController.registerUser);
    router.post("/login", authController.loginUser);
    router.get("/validate-user/:token", authController.validateUser);

    return router;
  }
}
