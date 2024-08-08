import { CreateTodoDto } from "../dtos/create-todo.dto";
import { TodoEntity } from "../entities/todo.entity";
import { CustomError } from "../errors/custom-error";
import { TodosRepositoryInterface } from "../repositories/todos.repository.interface";
import { TodosServiceInterface } from "./todos.service.interface";

export class TodosService implements TodosServiceInterface {
  constructor(private readonly todosRepository: TodosRepositoryInterface) {}

  async getTodos(): Promise<TodoEntity[]> {
    return await this.todosRepository.getTodos();
  }

  async getUserTodos(userId: number): Promise<TodoEntity[]> {
    return await this.todosRepository.getUserTodos(userId);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return await this.todosRepository.createTodo(createTodoDto);
  }

  // private handleError(error: any): CustomError {
  //   if (error instanceof CustomError) {
  //     return error;
  //   } else if (error instanceof Error) {
  //     return CustomError.internalServer(error.message);
  //   } else {
  //     return CustomError.unknow();
  //   }
  // }
}
