import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  providers: [],
  exports: [],
  imports: [TypeOrmModule.forFeature([])],
})
export class FutsalFieldRepositoryModule {}
