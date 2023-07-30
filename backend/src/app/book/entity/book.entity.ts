import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../core/shared/entities/base.entity';

@Entity()
@Unique(['ISBN'])
export class Book extends BaseEntity {

  @Column()
  @IsString()
  @Index()
  title: string;

  @Column()
  @IsString()
  author: string;

  @Column()
  @IsNumber()
  year: number;

  @Column()
  @IsString()
  @Index()
  ISBN: string;

  @Column()
  @IsString()
  comment: string;
}
