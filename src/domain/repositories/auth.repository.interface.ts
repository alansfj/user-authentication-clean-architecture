import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";

export interface AuthRepositoryInterface {
  getUserByEmail(email: string): Promise<UserEntity>;
  getUserById(id: number): Promise<UserEntity>;
  registeUser(dto: RegisterUserDto):  Promise<{ user: UserEntity; token: string }>;
  loginUser(dto: LoginUserDto): Promise<{ user: UserEntity; token: string }>;
}
