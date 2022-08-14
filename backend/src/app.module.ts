import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenService } from "./services/token.service";
import { getTypeOrmConfig } from "./scripts/getTypeOrmConfig";
import { PlayerEntity, GuessEntity, ScoreEntity } from "./entities";
import { DatabaseService } from "./services/database.service";
import { GuessGuard } from "./guards/GuessGuard";
import { APP_GUARD } from "@nestjs/core";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TypeOrmModule.forFeature([PlayerEntity, GuessEntity, ScoreEntity]),
  ],
  controllers: [AppController],
  providers: [
    DatabaseService,
    TokenService,
    AppService,
  ],
})
export class AppModule {}
