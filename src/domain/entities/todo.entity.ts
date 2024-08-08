export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly isCompleted: boolean,
    public readonly userId: number
  ) {}

  static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, isCompleted, userId } = object;

    return new TodoEntity(id, text, isCompleted, userId);
  }
}
