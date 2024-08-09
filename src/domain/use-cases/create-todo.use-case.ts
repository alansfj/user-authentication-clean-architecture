import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UserEntity } from "../entities/user.entity";
import { TodosServiceInterface } from "../services/todos.service.interface";

export class CreateTodoUseCase {
  constructor(private readonly todosService: TodosServiceInterface) {}

  execute(createTodoDto: CreateTodoDto, user: UserEntity) {
    return this.todosService.createTodo(createTodoDto, user);
  }
}
