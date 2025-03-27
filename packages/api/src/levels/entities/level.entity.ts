import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Levels {
  @PrimaryColumn()
  level: number;

  @Column({ length: 50 })
  name: string;
}
