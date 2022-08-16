import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { GuessService } from "./";
import { GuessGuard } from "../guards/GuessGuard";
import { BackExceptionFilter } from "../BackExceptionFilter";

@Controller()
export class GuessController {
  constructor(private readonly guessService: GuessService) {}

  @Post("/guess")
  @UseFilters(BackExceptionFilter)
  @UseGuards(GuessGuard)
  addGuess(
    @Body("playerId") playerId: number,
    @Body("guess") guess: number,
    @Body("initialPrice") initialPrice: number
  ): any {
    return this.guessService.addGuess(playerId, guess, initialPrice);
  }
}
