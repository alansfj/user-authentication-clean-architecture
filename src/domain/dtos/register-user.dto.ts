import { CustomError } from "../errors/custom-error";

export class RegisterUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly name: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, RegisterUserDto?] {
    const { email, password, confirmPassword, name } = object;

    if (!email) return [CustomError.badRequest("email property is required")];

    if (typeof email !== "string")
      return [CustomError.badRequest("email property must be a string")];

    if (!password)
      return [CustomError.badRequest("password property is required")];

    if (typeof password !== "string")
      return [CustomError.badRequest("password property must be a string")];

    if (!confirmPassword)
      return [CustomError.badRequest("confirmPassword property is required")];

    if (typeof confirmPassword !== "string")
      return [
        CustomError.badRequest("confirmPassword property must be a string"),
      ];

    if (!name) return [CustomError.badRequest("name property is required")];

    if (typeof name !== "string")
      return [CustomError.badRequest("name property must be a string")];

    if (password !== confirmPassword)
      return [CustomError.badRequest("passwords are not the same")];

    return [
      undefined,
      new RegisterUserDto(email, password, confirmPassword, name),
    ];
  }
}
