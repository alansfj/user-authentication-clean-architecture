import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginationDto } from "../dtos/pagination.dto";

export interface TodosServiceInterface {
  getTodos(paginationDto: PaginationDto): Promise<{
    todos: TodoEntity[];
    total: number;
    prevPage: number | null;
    nextPage: number | null;
  }>;
  getUserTodos(userId: number): Promise<TodoEntity[]>;
  createTodo(
    createTodoDto: CreateTodoDto,
    user: UserEntity
  ): Promise<TodoEntity>;
}
