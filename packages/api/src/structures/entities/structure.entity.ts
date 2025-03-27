import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Areas } from '../../areas/entities/area.entity';
import { Roles } from '../../roles/entities/role.entity';

@Entity()
export class Structures {
  @PrimaryGeneratedColumn()
  structureid: number;

  @ManyToOne(() => Areas, (area) => area.level)
  @JoinColumn()
  parent: number;

  @ManyToOne(() => Areas, (area) => area.level)
  @JoinColumn()
  child: number;

  @ManyToOne(() => Roles, (roles) => roles.structureid)
  @JoinColumn()
  rolesid: Roles[];
}
