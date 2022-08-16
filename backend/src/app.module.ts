import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeOrmConfig } from "./scripts/getTypeOrmConfig";
import { TokenService } from "./tokens/";
import { PlayerService, PlayerEntity } from "./players/";
import { GuessService, GuessEntity} from "./guesses/";
import { ScoreService, ScoreEntity } from "./scores/";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TypeOrmModule.forFeature([PlayerEntity, GuessEntity, ScoreEntity]),
  ],
  controllers: [AppController],
  providers: [PlayerService, GuessService, ScoreService, TokenService, AppService],
})
export class AppModule {}
