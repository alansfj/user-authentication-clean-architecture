import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "../../../domain/services/auth.service";
import { AuthRepository } from "../../repositories/auth.repository";
import { EmailService } from "../../../domain/services/email.service";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService();
    const authRepository = new AuthRepository(emailService);
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);

    router.post("/register", authController.registerUser);
    router.post("/login", authController.loginUser);
    router.get("/validate-email/:token", authController.validateUser);

    return router;
  }
}
