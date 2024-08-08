import { Router } from "express";
import { TodosRepository } from "../../repositories/todos.repository";
import { TodosService } from "../../../domain/services/todos.service";
import { TodosController } from "./todos.controller";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();

    const todosRepository = new TodosRepository();
    const todosService = new TodosService(todosRepository);
    const todosController = new TodosController(todosService);

    router.get("/", todosController.getTodos);
    router.post("/", todosController.createTodo);
    // router.post("/", todosController.validateUser);

    return router;
  }
}
