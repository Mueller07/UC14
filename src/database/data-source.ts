import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Livro } from '../models/Livro';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/database.sqlite', // caminho do arquivo SQLite
  entities: [User, Livro],
  synchronize: true,  // cuidado em produção: pode apagar dados!
  logging: true,
});
