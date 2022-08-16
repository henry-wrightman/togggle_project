import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService, PlayerController } from './';
import { PlayerEntity } from './';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}