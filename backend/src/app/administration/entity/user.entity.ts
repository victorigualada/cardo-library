import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../core/shared/entities/base.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {

  @IsString()
  @Index()
  @Column({ length: 20, nullable: false })
  username!: string;

  @IsString()
  @Exclude( { toPlainOnly: true })
  @Column({ length: 255, nullable: false })
  password!: string;

  @IsString()
  @Column({ length: 255 })
  name!: string;

  @IsString()
  @Column({ length: 255 })
  lastName!: string;

  @IsEmail()
  @Column({ length: 255, nullable: false })
  email!: string;
}
