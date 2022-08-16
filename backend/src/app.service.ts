import { Injectable } from "@nestjs/common";
import { TokenService, TokenDataResponse } from "./tokens/";
import { PlayerService, PlayerEntity } from "./players/";
import { GuessService, GuessEntity} from "./guesses/";
import { ScoreService, ScoreEntity } from "./scores/";

@Injectable()
export class AppService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly playerService: PlayerService,
    private readonly scoreService: ScoreService,
    private readonly guessService: GuessService
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
    const player = await this.playerService.addPlayer(identifier);
    return player;
  }

  async getPlayer(identifier: string): Promise<PlayerEntity> {
    const player = await this.playerService.getPlayer(identifier);
    return player;
  }

  async addGuess(
    playerId: number,
    guess: number,
    initialPrice: number
  ): Promise<void | Error> {
    const newGuess = await this.guessService.addGuess(playerId, guess);
    const timeRemaining = +new Date(newGuess.expiresAt) - +new Date();

    const callback = async (winnings, finalPrice) => {
      if (winnings === 0) throw Error("ERROR_CALCULATING_GUESS");

      await this.scoreService.updateScore(playerId, winnings);
      await this.guessService.updateGuess(
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
    return await this.scoreService.getLeaderboard();
  }
}
