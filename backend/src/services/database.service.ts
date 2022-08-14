import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { GuessEntity, PlayerEntity, ScoreEntity } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> {
  }

  constructor(
    @InjectRepository(GuessEntity)
    private readonly guessRepo: Repository<GuessEntity>,

    @InjectRepository(PlayerEntity)
    private readonly playerRepo: Repository<PlayerEntity>,

    @InjectRepository(ScoreEntity)
    private readonly scoreRepo: Repository<ScoreEntity>
  ) {}

  async getPlayer(identifier: string): Promise<PlayerEntity|undefined> {
    if (!identifier) return undefined;
    const result = await this.playerRepo.findOne({
      where: { identifier },
      relations: { score: true, guesses: true },
    });

    return result ? result : undefined;
  }

  async addPlayer(identifier: string): Promise<PlayerEntity|undefined> {
    if (!identifier) return undefined;
    const exists = await this.getPlayer(identifier);
    if (exists) return exists;

    const score = await this.scoreRepo.create({}); // create new score for player

    return await this.playerRepo.save({
      identifier,
      score, // attach new score
    });
  }

  async addGuess(playerId: number, guess: number): Promise<GuessEntity|undefined> {
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
  ): Promise<void|undefined> {
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

  async updateScore(playerId: number, value: number): Promise<void|undefined> {
    if (!playerId || !value) return undefined;

    const player = await this.playerRepo.findOne({
      where: { id: playerId },
      relations: { score: true },
    });

    if (!player) return undefined;

    await this.scoreRepo.update(
      {
        id: player.score.id,
      },
      {
        value: player.score.value + value,
      }
    );
  }

  async getLeaderboard(limit = 5): Promise<PlayerEntity[]|undefined>{
    return await this.playerRepo.find({
      relations: { score: true },
      order: { score: { value: "DESC" } },
      take: 5
    });    
  }
}
