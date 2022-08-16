import { Injectable } from "@nestjs/common";
import { GuessEntity } from "./";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GuessService {
  constructor(
    @InjectRepository(GuessEntity)
    private readonly guessRepo: Repository<GuessEntity>) {}

  async addGuess(
    playerId: number,
    guess: number
  ): Promise<GuessEntity | undefined> {
    if (!playerId || !guess) return undefined;
    return await this.guessRepo.save({
      playerId,
      guess,
    });
  }

  async hasCurrentGuess(playerId: number): Promise<boolean> {
    if (!playerId) return false;

    const time = new Date();
    const result = await this.guessRepo
      .createQueryBuilder("items")
      .where(
        "items.playerId = :playerId and items.expiresAt > :time and items.createdAt <= :time",
        { playerId, time }
      )
      .getMany();
    return result.length > 0 ? true : false;
  }

  async updateGuess(
    playerId: number,
    guessId: number,
    initialPrice: number,
    finalPrice: number,
    winner: boolean | false
  ): Promise<void | undefined> {
    if (!playerId || !guessId || !initialPrice || !finalPrice) return undefined;

    const guess = await this.guessRepo.findOne({
      where: { playerId, id: guessId },
    });
    if (!guess) return undefined;

    await this.guessRepo.update(
      {
        id: guess.id,
      },
      {
        initialPrice,
        finalPrice,
        winner,
      }
    );
  }
}
