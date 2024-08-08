import { CreateTodoDto } from "../../domain/dtos/create-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { TodosRepositoryInterface } from "../../domain/repositories/todos.repository.interface";
import { prisma } from "../database/prisma-client";

export class TodosRepository implements TodosRepositoryInterface {
  async getTodos(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async getUserTodos(userId: number): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });

    return todos.map(TodoEntity.fromObject);
  }

  async createTodo(dto: CreateTodoDto): Promise<TodoEntity> {
    const { text } = dto;

    throw CustomError.internalServer("not implemented yet");

    // const createdTodo = await prisma.todo.create({
    //   data: {
    //     text,
    //   },
    // });
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
