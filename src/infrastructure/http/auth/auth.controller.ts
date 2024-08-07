import { Request, Response } from "express";
import { RegisterUserDto } from "../../../domain/dtos/register-user.dto";
import { CustomError } from "../../../domain/errors/custom-error";
import { RegisterUserUseCase } from "../../../domain/use-cases/register-user.use-case";
import { AuthServiceInterface } from "../../../domain/services/auth.service.interface";
import { LoginUserDto } from "../../../domain/dtos/login-user.dto";
import { LoginUserUseCase } from "../../../domain/use-cases/login-user.use-case";
import { ValidateUserUseCase } from "../../../domain/use-cases/validate-user.use-case";
import { ValidateUserDto } from "../../../domain/dtos/validate-user.dto";

export class AuthController {
  constructor(private readonly authService: AuthServiceInterface) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    new RegisterUserUseCase(this.authService)
      .execute(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    new LoginUserUseCase(this.authService)
      .execute(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };

  validateUser = (req: Request, res: Response) => {
    const [error, validaUserDto] = ValidateUserDto.create(req.params);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    new ValidateUserUseCase(this.authService)
      .execute(validaUserDto!)
      .then((user) => res.json(user))
      .catch((error: CustomError) =>
        res.status(error.statusCode).json({ error: error.message })
      );
  };
}
