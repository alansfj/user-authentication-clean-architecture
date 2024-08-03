import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";

export interface AuthServiceInterface {
  getUserByEmail(email: string): Promise<UserEntity>;
  getUserById(id: number): Promise<UserEntity>;
  registeUser(dto: RegisterUserDto): Promise<UserEntity>;
  loginUser(dto: LoginUserDto): Promise<UserEntity>;
}
