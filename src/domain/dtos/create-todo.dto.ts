import { CustomError } from "../errors/custom-error";

export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, CreateTodoDto?] {
    const { text } = object;

    if (!text) return [CustomError.badRequest("text property is required")];

    if (typeof text !== "string")
      return [CustomError.badRequest("text property must be a string")];

    return [undefined, new CreateTodoDto(text)];
  }
}
