import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ScoreEntity, GuessEntity } from "./";

@Entity({ name: "players" })
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  identifier: string;

  @OneToOne((type) => ScoreEntity, (score) => score.player, { cascade: true })
  @JoinColumn()
  score: ScoreEntity;

  @OneToMany((type) => GuessEntity, (guess) => guess.player, { cascade: true })
  @JoinColumn()
  guesses: GuessEntity[];
}
