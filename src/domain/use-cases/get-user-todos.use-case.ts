import { TodosServiceInterface } from "../services/todos.service.interface";

export class GetUserTodosUseCase {
  constructor(private readonly todosService: TodosServiceInterface) {}

  execute(userId: number) {
    return this.todosService.getUserTodos(userId);
  }
}
