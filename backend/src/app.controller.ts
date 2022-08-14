import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { GuessGuard } from "./guards/GuessGuard";
import { BackExceptionFilter } from "./BackExceptionFilter";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @UseFilters(BackExceptionFilter)
  getTokenData(): any {
    return this.appService.getTokenData();
  }

  @Get("/player/:identifier")
  @UseFilters(BackExceptionFilter)
  getPlayer(@Param() params): any {
    return this.appService.getPlayer(params.identifier);
  }

  @Post("/player")
  @UseFilters(BackExceptionFilter)
  addPlayer(@Body("identifier") identifier: string): any {
    return this.appService.addPlayer(identifier);
  }

  @Post("/guess")
  @UseFilters(BackExceptionFilter)
  @UseGuards(GuessGuard)
  addGuess(
    @Body("playerId") playerId: number,
    @Body("guess") guess: number,
    @Body("initialPrice") initialPrice: number
  ): any {
    return this.appService.addGuess(playerId, guess, initialPrice);
  }

  @Get("/leaderboard")
  @UseFilters(BackExceptionFilter)
  getLeaderboard(): any {
    return this.appService.getLeaderboard();
  }
}
