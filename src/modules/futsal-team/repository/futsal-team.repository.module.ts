import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Player } from './entities/player.entity';
import { FutsalTeam } from './entities/futsal-team.entity';
import { FutsalTeamRepository } from './repositories/futsal-team.repository';
import { PlayerRepository } from './repositories/player.repository';

@Module({
  providers: [PlayerRepository, FutsalTeamRepository],
  exports: [PlayerRepository, FutsalTeamRepository],
  imports: [TypeOrmModule.forFeature([FutsalTeam, Player])],
})
export class FutsalTeamRepositoryModule {}
