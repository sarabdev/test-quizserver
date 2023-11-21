import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Category } from 'src/typeorm/entities/catagories';
import { Question } from 'src/typeorm/entities/questions';
import { Quiz } from 'src/typeorm/entities/quizs';
dotenv.config();

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Category, Question, Quiz],
  synchronize: true,
};
