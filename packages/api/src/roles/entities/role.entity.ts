import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Structures } from '../../structures/entities/structure.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  roleid: number;

  @ManyToOne(() => Users, (user) => user.userid)
  @JoinColumn()
  userid: Users;

  @ManyToOne(() => Structures, (structure) => structure.rolesid)
  @JoinColumn()
  structureid: Structures;
}
