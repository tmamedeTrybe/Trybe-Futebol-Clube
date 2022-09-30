import { FindOptions } from "sequelize";

export default interface IUserLogin extends FindOptions {
  email: string;
  password: string;
}
