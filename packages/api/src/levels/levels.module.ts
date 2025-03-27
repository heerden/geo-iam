import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Levels } from './entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Levels])],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
