import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom-error";
import { AuthRepositoryInterface } from "../repositories/auth.repository.interface";
import { AuthServiceInterface } from "./auth.service.interface";

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.authRepository.getUserByEmail(email);
  }

  getUserById(id: number): Promise<UserEntity> {
    return this.authRepository.getUserById(id);
  }

  async registeUser(dto: RegisterUserDto): Promise<UserEntity> {
    try {
      return await this.authRepository.registeUser(dto);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loginUser(
    dto: LoginUserDto
  ): Promise<{ user: UserEntity; token: string }> {
    try {
      return this.authRepository.loginUser(dto);
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
