import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuessService, GuessController } from './';
import { GuessEntity } from './';

@Module({
  imports: [TypeOrmModule.forFeature([GuessEntity])],
  providers: [GuessService],
  controllers: [GuessController],
})
export class GuessModule {}