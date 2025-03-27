import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Roles } from '../../roles/entities/role.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 500 })
  name: string;

  @OneToMany(() => Roles, (roles) => roles.userid)
  roles: Roles[];
}
