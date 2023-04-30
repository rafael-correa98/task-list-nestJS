import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel | string> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) { 
      throw new HttpException({
        status: 409,
        error: error.message,
      }, 409, {
        cause: error
      });
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto, ): Promise<UserModel | string> {
    try {
      return await this.usersService.login(loginUserDto);
    } catch (error) { 
      throw new HttpException({
        status: 400,
        error: error.message,
      }, 400, {
        cause: error
      });
    }
  }
}
