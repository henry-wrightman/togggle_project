import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import "dotenv/config";

import * as path from "path";
export function getTypeOrmConfig(): TypeOrmModuleOptions {
  const extension = path.extname(__filename);
  const isTypescript = extension === ".ts";

  const baseFolder = isTypescript ? "src/" : "dist/";
  const ext = isTypescript ? ".ts" : ".js";
  const entities = [`${baseFolder}entities/*${ext}`];
  const migrations = [`migration/*.${ext}`];

  const params: TypeOrmModuleOptions = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities,
    migrations,
    ssl: false,
    type: "postgres",
    migrationsTableName: "migration",
    autoLoadEntities: true,
    migrationsRun: true,
    //synchronize: true
  };

  return params;
}
