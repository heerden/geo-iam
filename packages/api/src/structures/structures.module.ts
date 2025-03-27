import { Module } from '@nestjs/common';
import { StructuresService } from './structures.service';
import { StructuresController } from './structures.controller';
import { AreasModule } from '../areas/areas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Structures } from './entities/structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Structures]), AreasModule],
  controllers: [StructuresController],
  providers: [StructuresService],
})
export class StructuresModule {}
