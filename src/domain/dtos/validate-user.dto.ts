import { regularExps } from "../../utils/regular-expressions";
import { CustomError } from "../errors/custom-error";

export class ValidateUserDto {
  private constructor(public readonly token: string) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, ValidateUserDto?] {
    const { token } = object;

    if (!token) return [CustomError.badRequest("token property is required")];

    return [undefined, new ValidateUserDto(token)];
  }
}
