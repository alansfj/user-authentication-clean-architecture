import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";

export interface TodosRepositoryInterface {
  getTodos(): Promise<TodoEntity[]>;
  getUserTodos(userId: number): Promise<TodoEntity[]>;
  createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
}
