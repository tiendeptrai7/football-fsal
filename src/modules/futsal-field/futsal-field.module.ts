import { Module } from '@nestjs/common';

import { FutsalFieldRepositoryModule } from './repository/futsal-team.repository.module';
import { FutsalFieldService } from './services/futsal-field.service';

@Module({
  imports: [FutsalFieldRepositoryModule],
  exports: [FutsalFieldService],
  providers: [FutsalFieldService],
  controllers: [],
})
export class FutsalFieldModule {}
