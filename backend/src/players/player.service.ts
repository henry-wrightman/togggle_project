import { Injectable } from "@nestjs/common";
import { PlayerEntity } from "./";
import { ScoreEntity } from "../scores";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepo: Repository<PlayerEntity>,

    @InjectRepository(ScoreEntity)
    private readonly scoreRepo: Repository<ScoreEntity>
  ) {}

  async getPlayer(identifier: string): Promise<PlayerEntity | undefined> {
    if (!identifier) return undefined;
    const result = await this.playerRepo.findOne({
      where: { identifier },
      relations: { score: true, guesses: true },
    });

    return result ? result : undefined;
  }

  async addPlayer(identifier: string): Promise<PlayerEntity | undefined> {
    if (!identifier) return undefined;
    const exists = await this.getPlayer(identifier);
    if (exists) return exists;

    const score = await this.scoreRepo.create({}); // create new score for player

    return await this.playerRepo.save({
      identifier,
      score, // attach new score
    });
  }
}