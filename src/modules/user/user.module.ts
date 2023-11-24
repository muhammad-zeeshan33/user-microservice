import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UnitOfWork } from '../postgres/uow';

@Module({
  controllers: [UserController],
  providers: [UserService, UnitOfWork],
})
export class UserModule {}
