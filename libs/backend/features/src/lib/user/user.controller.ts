import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, ICreateUser, IUpdateUser } from '@InstrumentRental/shared/api';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAll(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IUser | null> {
    return await this.userService.getOne(id);
  }

  @Post('')
  async create(@Body() data: ICreateUser): Promise<IUser> {
    return await this.userService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateUser): Promise<IUser> {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
