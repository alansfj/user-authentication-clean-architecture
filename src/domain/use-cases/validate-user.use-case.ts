import { ValidateUserDto } from "../dtos/validate-user.dto";
import { AuthServiceInterface } from "../services/auth.service.interface";

export class ValidateUserUseCase {
  constructor(private readonly authService: AuthServiceInterface) {}

  execute(validateUserDto: ValidateUserDto) {
    return this.authService.validateUser(validateUserDto);
  }
}
