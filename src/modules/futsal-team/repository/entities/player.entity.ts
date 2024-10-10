import { EPosition, EStatus } from '@app/constant/app.enum';
import { BaseEntity } from '@common/database/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { FutsalTeam } from './futsal-team.entity';

@Entity()
export class Player extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  team_id: number;

  @Column()
  @ApiProperty()
  first_name: string;

  @Column()
  @ApiProperty()
  last_name: string;

  @Column()
  @ApiProperty()
  nationality: string;

  @Index()
  @Column('smallint')
  @ApiProperty({ enum: EPosition })
  position: EPosition;

  @Column()
  @ApiProperty()
  birth_date: Date;

  @Column('smallint', { default: EStatus.inactive })
  @ApiProperty({ enum: EStatus })
  status: EStatus;

  @ManyToOne(() => FutsalTeam, (f) => f.players)
  @JoinColumn({ name: 'team_id' })
  futsal_team: FutsalTeam;

  @OneToOne(() => FutsalTeam, (p) => p.team_leader, {
    cascade: true,
  })
  @ApiProperty({ type: () => FutsalTeam })
  team_leader: FutsalTeam;
}
