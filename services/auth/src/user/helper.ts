import {ApplicationDataSource} from "../database/datasource";
import {UserModel} from "../database/model";
import bcrypt from "bcrypt";

export async function createUser(
  username: string,
  password: string,
  type: "local" | "tui" = "local",
) {
  const user = ApplicationDataSource.manager.create(UserModel, {
    type,
    username: username,
    password: await bcrypt.hash(password, 10),
  });
  await ApplicationDataSource.manager.save(user);
  return user;
}
