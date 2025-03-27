import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Areas } from './entities/area.entity';
import { LevelsModule } from '../levels/levels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Areas]), LevelsModule],
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}
