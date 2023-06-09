export class Task {
  public id?: number;
  public task_name: string;
  public task_description: string;
  public user_id?: number;
  public created_at?: Date;
  public updated_at?: Date;
  constructor(
    task_name: string,
    task_description: string,
    id?: number,
    user_id?: number,
    created_at?: Date,
    updated_at?: Date
  ) {
    this.task_name = task_name;
    this.task_description = task_description;
    this.user_id = user_id;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
