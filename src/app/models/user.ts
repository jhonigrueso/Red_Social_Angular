export class User {
  public gettoken: any;
  constructor(
    public _id: string,
    public name: String,
    public surname: String,
    public nick: String,
    public email: String,
    public password: String,
    public role: string,
    public image: String
  ) {}
}
