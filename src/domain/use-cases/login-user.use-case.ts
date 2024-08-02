import { LoginUserDto } from "../dtos/login-user.dto";
import { AuthServiceInterface } from "../services/auth.service.interface";

export class LoginUserUseCase {
  constructor(private readonly authService: AuthServiceInterface) {}

  execute(loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
