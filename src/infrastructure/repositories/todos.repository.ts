import { CreateTodoDto } from "../../domain/dtos/create-todo.dto";
import { PaginationDto } from "../../domain/dtos/pagination.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { TodosRepositoryInterface } from "../../domain/repositories/todos.repository.interface";
import { prisma } from "../database/prisma-client";

export class TodosRepository implements TodosRepositoryInterface {
  async getTodos(dto: PaginationDto): Promise<TodoEntity[]> {
    try {
      const { page, limit } = dto;

      const todos = await prisma.todo.findMany({
        skip: page * limit - limit,
        take: limit,
      });

      return todos.map(TodoEntity.fromObject);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserTodos(userId: number): Promise<TodoEntity[]> {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId,
        },
      });

      return todos.map(TodoEntity.fromObject);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createTodo(dto: CreateTodoDto, user: UserEntity): Promise<TodoEntity> {
    try {
      const { text } = dto;

      console.log(text);

      const todo = await prisma.todo.findFirst({
        where: {
          text,
        },
      });

      if (todo) throw CustomError.badRequest("todo alredy exist");

      const createdTodo = await prisma.todo.create({
        data: {
          text,
          userId: user.id,
        },
      });

      return TodoEntity.fromObject(createdTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): CustomError {
    if (error instanceof CustomError) {
      return error;
    } else if (error instanceof Error) {
      return CustomError.internalServer(error.message);
    } else {
      return CustomError.unknow();
    }
  }
}
