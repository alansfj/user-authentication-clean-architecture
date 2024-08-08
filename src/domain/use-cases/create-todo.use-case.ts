import { CreateTodoDto } from "../dtos/create-todo.dto";
import { TodosServiceInterface } from "../services/todos.service.interface";

export class CreateTodoUseCase {
  constructor(private readonly todosService: TodosServiceInterface) {}

  execute(createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }
}
