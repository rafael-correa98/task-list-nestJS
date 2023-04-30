import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@prisma/client';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const userExists = await this.verifyUserExistsByName(data.name)

    if (userExists) {
      throw new Error("Usuário já existe");
    }


    const encryptedPassword = await bcrypt.hash(data.password.toString(), 2);
  
    return await this.prisma.user.create({
      data: {
        name: data.name,
        password: encryptedPassword
      }
    });
  }

  async login(data: LoginUserDto) {
    const user = await this.findUserByName(data.name);

    const passwordConfirm = await bcrypt.compare(data.password, user.password);

    if (!passwordConfirm){
        throw new Error("Senha inválida");
    }

    user.password = undefined

    return user;
  }

  private async findUserByName(name: string): Promise<User>{
    const user = await this.prisma.user.findFirst({
      where: {
        name,
      }
    })

    if(!user){
        throw new Error("Usuario não encontrado");
    }
        
    return user
  }

  private async verifyUserExistsByName(name: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        name,
      }
    })

    return !!user;
  }

  async verifyUserExistsById(userId: string): Promise<boolean>{
    const userEntity = await this.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
  
    return !!userEntity;
  }
}
