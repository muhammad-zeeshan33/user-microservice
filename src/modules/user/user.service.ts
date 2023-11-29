import { UpdatePasswordDto } from './../common/dtos/updatePassword.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dtos/createUserDto.dto';
import { User } from '../common/entities/user.entity';
import { UnitOfWork } from '../postgres/uow';

@Injectable()
export class UserService {
  constructor(private readonly uow: UnitOfWork) {}

  async findAll(): Promise<User[]> {
    return await this.uow.getRepository(User).find();
  }

  async findOne(id: number): Promise<User> {
    return await this.uow.getRepository(User).findOneBy({ id: id });
  }

  async create(createUserDto: CreateUserDto): Promise<User | string> {
    const user = await this.uow
      .getRepository(User)
      .findOneBy({ email: createUserDto.email });
    if (user) {
      return 'User already exists';
    }
    return await this.uow.getRepository(User).save(createUserDto);
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.uow.getRepository(User).findOneBy({ id: id });
    if (!user) {
      return null;
    }
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    await this.uow.getRepository(User).update(id, user);
    return user;
  }

  async findByEmail(email: string): Promise<User | string> {
    const user = await this.uow.getRepository(User).findOneBy({ email: email });
    if (!user) {
      return 'User not found';
    }
    return user;
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | string> {
    const user = await this.uow.getRepository(User).findOneBy({ id: id });
    if (!user) {
      return 'User not found';
    }
    user.password = updatePasswordDto.password;
    await this.uow.getRepository(User).update(id, user);
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.uow.getRepository(User).findOneBy({ id: id });
    if (!user) {
      return null;
    }
    await this.uow.getRepository(User).delete(id);
    return user;
  }
}
