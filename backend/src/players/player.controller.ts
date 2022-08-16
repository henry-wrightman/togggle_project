import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { PlayerService } from "./";
import { BackExceptionFilter } from "../BackExceptionFilter";

@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get("/player/:identifier")
  @UseFilters(BackExceptionFilter)
  getPlayer(@Param() params): any {
    return this.playerService.getPlayer(params.identifier);
  }

  @Post("/player")
  @UseFilters(BackExceptionFilter)
  addPlayer(@Body("identifier") identifier: string): any {
    return this.playerService.addPlayer(identifier);
  }
}
