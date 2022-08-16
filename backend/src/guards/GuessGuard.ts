import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from '../services/database.service';

@Injectable()
export class GuessGuard implements CanActivate {
  constructor(private readonly databaseService: DatabaseService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.body?.guess || (request.body?.guess != 1 && request.body?.guess != -1))
      throw new Error('GUESS_INVALID');
    if (!request.body?.playerId) throw new Error('GUESS_REQUIRES_PLAYER_ID');
    if (!request.body?.initialPrice) throw new Error('GUESS_INVALID_INITIAL_PRICE');

    const alreadyGuessed = await this.databaseService.hasCurrentGuess(request.body?.playerId);
    if (alreadyGuessed) throw new Error('GUESS_IN_PROGRESS');

    return true;
  }
}
