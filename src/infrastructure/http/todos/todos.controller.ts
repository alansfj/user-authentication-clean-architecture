import { Request, Response } from "express";
import { CustomError } from "../../../domain/errors/custom-error";
import { TodosServiceInterface } from "../../../domain/services/todos.service.interface";
import { GetTodosUseCase } from "../../../domain/use-cases/get-todos.use-case";
import { GetUserTodosUseCase } from "../../../domain/use-cases/get-user-todos.use-case";
import { CreateTodoUseCase } from "../../../domain/use-cases/create-todo.use-case";
import { CreateTodoDto } from "../../../domain/dtos/create-todo.dto";
import { PaginationDto } from "../../../domain/dtos/pagination.dto";

export class TodosController {
  constructor(private readonly todosService: TodosServiceInterface) {}

  getTodos = (req: Request, res: Response) => {
    const [error, paginationDto] = PaginationDto.create(req.query);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    new GetTodosUseCase(this.todosService)
      .execute(paginationDto!)
      .then((todos) => res.json(todos))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };

  getUserTodos = (req: Request, res: Response) => {
    let { userId } = req.body;

    userId = Number(userId);

    if (isNaN(userId))
      return res
        .status(400)
        .json({ error: "userId property must be a number" });

    new GetUserTodosUseCase(this.todosService)
      .execute(userId)
      .then((todos) => res.json(todos))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };

  createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    const user = req.body.user;

    new CreateTodoUseCase(this.todosService)
      .execute(createTodoDto!, user)
      .then((todo) => res.json(todo))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };
}
