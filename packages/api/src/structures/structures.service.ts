import { Injectable } from '@nestjs/common';
import { CreateStructureDto } from './dto/create-structure.dto';
import { UpdateStructureDto } from './dto/update-structure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Structures } from './entities/structure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StructuresService {
  constructor(
    @InjectRepository(Structures)
    private structuresRepository: Repository<Structures>,
  ) {}

  create(createStructureDto: CreateStructureDto) {
    const structure = new Structures();
    structure.parent = createStructureDto.parent;
    structure.child = createStructureDto.child;

    return this.structuresRepository.save(structure);
  }

  async findAll(): Promise<Structures[]> {
    return this.structuresRepository
      .createQueryBuilder('structures')
      .leftJoinAndSelect('structures.parent', 'parent')
      .leftJoinAndSelect('structures.child', 'child')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} structure`;
  }

  update(id: number, updateStructureDto: UpdateStructureDto) {
    return `This action updates a #${id} structure`;
  }

  remove(id: number) {
    return `This action removes a #${id} structure`;
  }
}
