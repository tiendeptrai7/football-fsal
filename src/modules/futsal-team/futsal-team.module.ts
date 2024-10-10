import { Module } from '@nestjs/common';

import { FutsalTeamRepositoryModule } from './repository/futsal-team.repository.module';
import { FutsalTeamService } from './services/futsal-team.service';

@Module({
  imports: [FutsalTeamRepositoryModule],
  exports: [FutsalTeamService],
  providers: [FutsalTeamService],
  controllers: [],
})
export class FutsalTeamModule {}
