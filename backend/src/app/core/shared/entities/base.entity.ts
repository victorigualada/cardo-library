import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IBaseEntity } from '../interfaces/base';
import {IsBoolean} from 'class-validator';

export abstract class BaseEntity implements IBaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column( { type: 'timestamp with time zone', nullable: true, select: false })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, select: false })
  updatedAt: Date;

  @IsBoolean()
  @Column({ type: 'boolean', nullable: false, default: true })
  active!: boolean;
}
