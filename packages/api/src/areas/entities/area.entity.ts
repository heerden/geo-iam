import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Levels } from '../../levels/entities/level.entity';
import { Roles } from '../../roles/entities/role.entity';
import { Structures } from '../../structures/entities/structure.entity';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  areaid: number;

  @ManyToOne(() => Levels, (level) => level.level)
  @JoinColumn()
  level: number;

  @Column()
  name: string;

  @Column({
    type: String,
    nullable: true,
  })
  code: string;

  // "[longitude, latitude]"
  @Column({
    type: String,
    nullable: true,
  })
  coordinates: string;

  // @ManyToOne(() => Structures, (structures) => structures.parent)
  // roles: RolesTop[];
  // @ManyToOne(() => Structures, (structures) => structures.child)
  // roles: RolesBottom[];
}
