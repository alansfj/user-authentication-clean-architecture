import { TodosServiceInterface } from "../services/todos.service.interface";

export class GetTodosUseCase {
  constructor(private readonly todosService: TodosServiceInterface) {}

  execute() {
    return this.todosService.getTodos();
  }
}
