import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/entities/user.entity';
import { DeepPartial, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async findByRefreshToken(token: string): Promise<User | null> {
    return this.repository.findOne({ where: { refresh_token: token } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  public async findByPhoneNumber(phone: string): Promise<User | null> {
    return this.repository.findOne({ where: { phone_number: phone } });
  }

  public async findByUuid(uuid: string): Promise<User | null> {
    return this.repository.findOne({ where: { uuid: uuid } });
  }

  public async findAdmin(): Promise<User | null> {
    return this.repository.findOne({ where: { role: Role.ADMIN } });
  }

  public async existEmailForOtherUser(
    email: string,
    uuid: string,
  ): Promise<boolean> {
    return this.repository.exist({ where: { email, uuid: Not(uuid) } });
  }

  public async existPhoneForOtherUser(
    phone: string,
    uuid: string,
  ): Promise<boolean> {
    return this.repository.exist({
      where: { phone_number: phone, uuid: Not(uuid) },
    });
  }

  public async create(data: DeepPartial<User>): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  public async update(
    uuid: string,
    data: DeepPartial<User>,
  ): Promise<UpdateResult> {
    return this.repository.update({ uuid }, data);
  }
}
