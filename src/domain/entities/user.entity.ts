export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly isValidate: boolean,
    public readonly password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, email, isValidate, password } = object;

    return new UserEntity(id, name, email, isValidate, password);
  }

  static fromObjectWithoutPassword(object: { [key: string]: any }): UserEntity {
    const { password, ...rest } = object;

    return this.fromObject(rest);
  }
}
