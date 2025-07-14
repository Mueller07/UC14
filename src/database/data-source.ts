import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Livro } from "../models/Livro";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Livro],
  migrations: [],
  subscribers: [],
});
