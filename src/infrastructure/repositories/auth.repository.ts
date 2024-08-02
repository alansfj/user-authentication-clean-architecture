import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { AuthRepositoryInterface } from "../../domain/repositories/auth.repository.interface";

export class AuthRepository implements AuthRepositoryInterface {
  registeUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    throw CustomError.badRequest("not implemented yet");
  }

  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    throw CustomError.badRequest("not implemented yet");
  }
}
