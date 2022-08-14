// eslint-disable-next-line @typescript-eslint/no-var-requires
import "dotenv/config";
import { DataSource } from "typeorm";
import * as path from "path";

const extension = path.extname(__filename);
const isTypescript = extension === ".ts";

const baseFolder = isTypescript ? "src/" : "dist/";
const ext = isTypescript ? ".ts" : ".js";
const entities = [`${baseFolder}entities/*${ext}`];
const migrations = [`migration/*.${ext}`];

const config = new DataSource({
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
  migrationsRun: true,
});

export default config;
