export class User {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public token?: string,
    public id_token_user?: string,
    public created_at?: string,
    public updated_at?: string,
    public password?: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
    this.id_token_user = id_token_user;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.password = password;
  }
}
