import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PlayerEntity } from "./";

const minuteExpiration = 1;

@Entity({ name: "guesses" })
export class GuessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: number;

  @ManyToOne((type) => PlayerEntity, (player) => player.guesses)
  @JoinColumn()
  player: PlayerEntity;

  @Column({ default: 0 }) // -1 (down) 1 (up)
  guess: number;

  @Column({ default: 0 })
  initialPrice: number;

  @Column({ default: 0 })
  finalPrice: number;

  @Column({ default: false })
  winner: boolean;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamptz",
    default: () => "NOW()",
  })
  createdAt: Date;

  @CreateDateColumn({
    name: "expiresAt",
    type: "timestamptz",
    default: () => "NOW() + '60 second'::interval",
  })
  expiresAt: Date;
}
