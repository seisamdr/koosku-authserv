import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  ADMIN = 'ADMIN',
  BOARDER = 'BOARDER',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    length: 36,
  })
  uuid: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 15,
  })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.BOARDER,
  })
  role: Role;

  @Column()
  photo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  refresh_token: string;

  @Column({
    nullable: true,
  })
  refresh_token_expired_at: Date;

  @Column({
    name: 'created_at',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
  })
  updated_at: Date;
}
