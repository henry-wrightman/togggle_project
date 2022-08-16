import {
  Controller,
  Get,
  UseFilters,
} from "@nestjs/common";
import { ScoreService } from "./";
import { BackExceptionFilter } from "../BackExceptionFilter";

@Controller()
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get("/leaderboard")
  @UseFilters(BackExceptionFilter)
  getLeaderboard(): any {
    return this.scoreService.getLeaderboard();
  }
}
