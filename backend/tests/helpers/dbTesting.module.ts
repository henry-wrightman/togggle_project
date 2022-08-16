import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessEntity, PlayerEntity, ScoreEntity } from '../../src/entities';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import 'dotenv/config';
import { ConnectionOptions, DataSource } from 'typeorm';

export const DbTestingModule = () => [
  TypeOrmModule.forRoot({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    type: 'postgres',
    database: 'db_tests',
    entities: [GuessEntity, PlayerEntity, ScoreEntity],
  }),
  TypeOrmModule.forFeature([GuessEntity, PlayerEntity, ScoreEntity]),
];

export const DbConnectionOptions: ConnectionOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: 'postgres',
  database: 'db_tests',
  //dropSchema: true,
  entities: [GuessEntity, PlayerEntity, ScoreEntity],
  synchronize: true,
};

export const AppDataSource = new DataSource(DbConnectionOptions);
