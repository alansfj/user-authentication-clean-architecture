import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";

export interface AuthRepositoryInterface {
  registeUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
