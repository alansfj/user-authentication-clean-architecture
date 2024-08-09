import { PaginationDto } from "../dtos/pagination.dto";
import { TodosServiceInterface } from "../services/todos.service.interface";

export class GetTodosUseCase {
  constructor(private readonly todosService: TodosServiceInterface) {}

  execute(paginationDto: PaginationDto) {
    return this.todosService.getTodos(paginationDto);
  }
}
