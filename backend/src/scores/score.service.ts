import { Injectable } from "@nestjs/common";
import { ScoreEntity } from "./";
import { PlayerEntity } from "../players";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ScoreService {
  constructor(@InjectRepository(PlayerEntity)
    private readonly playerRepo: Repository<PlayerEntity>,

    @InjectRepository(ScoreEntity)
    private readonly scoreRepo: Repository<ScoreEntity>
  ) {}

  async updateScore(
    playerId: number,
    value: number
  ): Promise<void | undefined> {
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

  async getLeaderboard(limit = 5): Promise<PlayerEntity[] | undefined> {
    return await this.playerRepo.find({
      relations: { score: true },
      order: { score: { value: "DESC" } },
      take: 5,
    });
  }
}