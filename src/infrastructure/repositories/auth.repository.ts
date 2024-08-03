import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { AuthRepositoryInterface } from "../../domain/repositories/auth.repository.interface";
import { prisma } from "../database/prisma-client";

export class AuthRepository implements AuthRepositoryInterface {
  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user)
        throw CustomError.notFound(`user with email ${email} not found`);

      return UserEntity.fromObjectWithoutPassword(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) throw CustomError.notFound(`user with id ${id} not found`);

      return UserEntity.fromObjectWithoutPassword(user);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async registeUser(dto: RegisterUserDto): Promise<UserEntity> {
    try {
      const { email, password, name } = dto;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (user)
        throw CustomError.badRequest(`user with email ${email} already exists`);

      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });

      return UserEntity.fromObjectWithoutPassword(newUser);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loginUser(dto: LoginUserDto): Promise<UserEntity> {
    throw CustomError.badRequest("not implemented yet");
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
