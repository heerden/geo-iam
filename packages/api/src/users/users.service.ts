import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.name = createUserDto.name;

    return this.usersRepository.save(user);
  }

  // update(updateUserDto: UpdateUserDto) {
  //   return 'TODO';
  // }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // findOne(id: number): Promise<Users> {
  // TODO
  //   return this.usersRepository.findOneBy({ id: id });
  // }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async getAllStructures(id: number): Promise<Users[]> {
    return this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .leftJoinAndSelect('roles.structureid', 'structures')
      .leftJoinAndSelect('structures.parent', 'parent')
      .leftJoinAndSelect('structures.child', 'child')
      .leftJoinAndSelect('parent.level', 'level1')
      .leftJoinAndSelect('child.level', 'level2')
      .where('(users.userid = :id)')
      .setParameters({ id: id })
      .getMany();
  }
}
