import { EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class FutsalTeam extends BaseEntity {
  @Index()
  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  thumbnail: string;

  @Column()
  @ApiProperty()
  code: string;

  @Column('text')
  @ApiProperty()
  content: string;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @OneToMany(() => Player, (p) => p.futsal_team)
  players: Player[];

  @Column({ nullable: true })
  @ApiProperty()
  team_leader_id: number;

  @OneToOne(() => Player, (p) => p.team_leader)
  @JoinColumn({ name: 'team_leader_id' })
  @ApiProperty({ type: () => Player })
  team_leader: Player;

  @Column('int', { nullable: true })
  @ApiProperty()
  established_year: number;
}
