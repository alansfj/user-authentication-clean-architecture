export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly isValidated: boolean,
    public readonly password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, email, isValidated, password } = object;

    return new UserEntity(id, name, email, isValidated, password);
  }

  static fromObjectWithoutPassword(object: { [key: string]: any }): UserEntity {
    const { password, ...rest } = object;

    return this.fromObject(rest);
  }
}
