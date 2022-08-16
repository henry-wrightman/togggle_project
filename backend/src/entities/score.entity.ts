import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerEntity } from './';

@Entity({ name: 'scores' })
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => PlayerEntity, (player) => player.score)
  player: PlayerEntity;

  @Column({ default: 0 })
  value: number;

  @CreateDateColumn({
    name: 'time',
    type: 'timestamp',
    default: () => 'now()',
  })
  time: Date;
}
