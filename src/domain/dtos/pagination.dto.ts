import { CustomError } from "../errors/custom-error";

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, PaginationDto?] {
    const { page = 1, limit = 10 } = object;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber))
      return [CustomError.badRequest("page and limit must be number")];

    if (pageNumber <= 0)
      return [CustomError.badRequest("page must be greater than zero")];

    if (limitNumber <= 0)
      return [CustomError.badRequest("limit must be greater than zero")];

    return [undefined, new PaginationDto(pageNumber, limitNumber)];
  }
}
