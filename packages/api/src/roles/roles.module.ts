import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { UsersModule } from '../users/users.module';
import { StructuresModule } from '../structures/structures.module';

@Module({
  imports: [TypeOrmModule.forFeature([Roles]), UsersModule, StructuresModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
