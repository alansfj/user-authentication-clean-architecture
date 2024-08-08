import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { TodosRoutes } from "./todos/todos.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/todos", TodosRoutes.routes);

    return router;
  }
}
