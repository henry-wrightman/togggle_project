import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService, ScoreController } from './';
import { ScoreEntity } from './';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreEntity])],
  providers: [ScoreService],
  controllers: [ScoreModule],
})
export class ScoreModule {}