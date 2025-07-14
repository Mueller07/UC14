import dotenv from 'dotenv';
dotenv.config();  // <-- Adicione essa linha para carregar as variáveis do .env

import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Livro } from '../models/Livro';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Livro],
  synchronize: true,
  logging: true,
});


