import { CustomError } from "../errors/custom-error";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [CustomError?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return [CustomError.badRequest("email property is required")];

    if (typeof email !== "string")
      return [CustomError.badRequest("email property must be a string")];

    if (!password)
      return [CustomError.badRequest("password property is required")];

    if (typeof password !== "string")
      return [CustomError.badRequest("password property must be a string")];

    return [undefined, new LoginUserDto(email, password)];
  }
}
