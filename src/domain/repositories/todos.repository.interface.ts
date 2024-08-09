import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UserEntity } from "../entities/user.entity";
import { PaginationDto } from "../dtos/pagination.dto";

export interface TodosRepositoryInterface {
  getTodos(paginationDto: PaginationDto): Promise<TodoEntity[]>;
  getUserTodos(userId: number): Promise<TodoEntity[]>;
  createTodo(
    createTodoDto: CreateTodoDto,
    user: UserEntity
  ): Promise<TodoEntity>;
}
