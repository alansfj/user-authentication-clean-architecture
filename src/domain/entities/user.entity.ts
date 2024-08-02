export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly isValidate: boolean,
    public readonly password: string
  ) {}

  fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, email, isValidate, password } = object;

    return new UserEntity(id, name, email, isValidate, password);
  }
}
