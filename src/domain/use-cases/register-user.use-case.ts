import { RegisterUserDto } from "../dtos/register-user.dto";
import { AuthServiceInterface } from "../services/auth.service.interface";

export class RegisterUserUseCase {
  constructor(private readonly authService: AuthServiceInterface) {}

  execute(registerUserDto: RegisterUserDto) {
    return this.authService.registeUser(registerUserDto);
  }
}
