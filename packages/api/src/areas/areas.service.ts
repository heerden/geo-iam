import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Areas } from './entities/area.entity';
import { Repository } from 'typeorm';
import { Structures } from '../structures/entities/structure.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private areasRepository: Repository<Areas>,
  ) {}

  create(createAreaDto: CreateAreaDto) {
    const area = new Areas();
    area.level = createAreaDto.level;
    area.name = createAreaDto.name;
    area.code = createAreaDto.code;
    area.coordinates = createAreaDto.coordinates;

    return this.areasRepository.save(area);
  }

  async findAll(): Promise<Areas[]> {
    return this.areasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }

  getAllUsers(id: number) {
    return `TODO: This action will return all the adjancency lists for the specific Area #${id} linked for all Users!`;
    // return this.areasRepository
    //   .createQueryBuilder('areas')
    //   .leftJoinAndSelect('areas.structureid', 'structures')
    //   .leftJoinAndSelect('structure.userid', 'roles')
    //   .leftJoinAndSelect('roles.roles', 'users')
    //   .where('(areas.areasid = :id)')
    //   .setParameters({ id: id })
    //   .getMany();
  }
}
