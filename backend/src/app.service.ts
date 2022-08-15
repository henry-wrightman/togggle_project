import { Injectable } from "@nestjs/common";
import { TokenService } from "./services/token.service";
import { TokenDataResponse } from "./types";
import { DatabaseService } from "./services/database.service";
import { PlayerEntity } from "./entities";

@Injectable()
export class AppService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly databaseService: DatabaseService
  ) {}

  async getTokenData(): Promise<TokenDataResponse | Error> {
    const result =
      (await this.tokenService.getTokenData()) as TokenDataResponse;
    if (!result) {
      return new Error("API_UNREACHABLE");
    }
    return result;
  }

  async addPlayer(identifier: string): Promise<PlayerEntity> {
    const player = await this.databaseService.addPlayer(identifier);
    return player;
  }

  async getPlayer(identifier: string): Promise<PlayerEntity> {
    const player = await this.databaseService.getPlayer(identifier);
    return player;
  }

  async addGuess(
    playerId: number,
    guess: number,
    initialPrice: number
  ): Promise<void | Error> {
    const newGuess = await this.databaseService.addGuess(playerId, guess);
    const timeRemaining = +new Date(newGuess.expiresAt) - +new Date();

    const callback = async (winnings, finalPrice) => {
      if (winnings === 0) throw Error("ERROR_CALCULATING_GUESS");

      await this.databaseService.updateScore(playerId, winnings);
      await this.databaseService.updateGuess(
        playerId,
        newGuess.id,
        initialPrice,
        finalPrice,
        winnings === 1
      );
    };

    this.tokenService.manageGuess(guess, timeRemaining, initialPrice, callback);
    return;
  }

  async getLeaderboard(): Promise<PlayerEntity[]> {
    return await this.databaseService.getLeaderboard();
  }
}
