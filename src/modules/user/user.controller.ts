import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dtos/createUserDto.dto';
import { UpdatePasswordDto } from './../common/dtos/updatePassword.dto';
import { User } from '../common/entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User | string> {
    return await this.userService.create(createUserDto);
  }

  @Post(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateUserDto })
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, createUserDto);
  }

  @Get('findByEmail/:email')
  async findByUsername(
    @Param('email') username: string,
  ): Promise<User | string> {
    return await this.userService.findByEmail(username);
  }

  @Post('updatePassword/:id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdatePasswordDto })
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | string> {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@Param('id') id: number): Promise<User> {
    return await this.userService.delete(id);
  }
}
