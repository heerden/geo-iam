import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Levels } from './entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Levels)
    private levelsRepository: Repository<Levels>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    const level = new Levels();
    level.level = createLevelDto.level;
    level.name = createLevelDto.name;

    return this.levelsRepository.save(level);
  }

  async findAll(): Promise<Levels[]> {
    return this.levelsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
