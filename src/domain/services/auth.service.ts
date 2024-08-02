import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { AuthRepositoryInterface } from "../repositories/auth.repository.interface";
import { AuthServiceInterface } from "./auth.service.interface";

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  registeUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authRepository.registeUser(registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authRepository.loginUser(loginUserDto);
  }
}
