import { Injectable } from '@nestjs/common';
import { CreateRoleDto, CreateRoleOutputDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { Structures } from '../structures/entities/structure.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  // CRUD

  async create(createRoleDto: CreateRoleDto) {
    const role = new Roles();
    role.userid = { userid: createRoleDto.userid } as Users;
    role.structureid = { structureid: createRoleDto.structureid } as Structures;

    // TODO: consider alternative notation
    // const role = rolesRepository.create({
    //   user: { userid: dto.userid } as Users,
    //   structure: { structureid: dto.structureid } as Structures,
    // });

    const roleSaved = await this.rolesRepository.save(role);

    return { roleid: roleSaved.roleid } as CreateRoleOutputDto;
  }

  async findAll(): Promise<Roles[]> {
    return this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.userid', 'users')
      .leftJoinAndSelect('roles.structureid', 'structures')
      .leftJoinAndSelect('structures.parent', 'parent')
      .leftJoinAndSelect('structures.child', 'child')
      .leftJoinAndSelect('parent.level', 'level1')
      .leftJoinAndSelect('child.level', 'level2')
      .getMany();
  }

  findOne(id: number) {
    return this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.userid', 'users')
      .leftJoinAndSelect('roles.structureid', 'structures')
      .leftJoinAndSelect('structures.parent', 'parent')
      .leftJoinAndSelect('structures.child', 'child')
      .leftJoinAndSelect('parent.level', 'level1')
      .leftJoinAndSelect('child.level', 'level2')
      .where({ roleid: id })
      .getOne();
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  // Business Logic

  getUserAccess(userId: number) {
    return this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.userid', 'users')
      .leftJoinAndSelect('roles.structureid', 'structures')
      .leftJoinAndSelect('structures.parent', 'parent')
      .leftJoinAndSelect('structures.child', 'child')
      .leftJoinAndSelect('parent.level', 'level1')
      .leftJoinAndSelect('child.level', 'level2')
      .where('(roles.userid = :userId)')
      .setParameters({ userId: userId })
      .getMany();
  }

  getUserAccessTo(id: number, userId: number) {
    return `This action finds the access points for user #${id} on user #${userId}`;
  }
}
