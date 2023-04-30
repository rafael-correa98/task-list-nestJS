import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService, private user: UsersService) {}
  async createTask(createTaskDto: CreateTaskDto, userId: string){
    const userExists = await this.user.verifyUserExistsById(userId);
    if (!userExists) {
        throw new Error("User não encontrado");
    }

    const task = await this.prisma.task.create({
      data: {
        description: createTaskDto.description,
        detail: createTaskDto.detail,
        fk_id_user: userId 
      }
    })

    return task
  }

  // const userExists = await this._userRepository.verifyUserExistsById(userId);
  // if (!userExists) {
  //     throw new Error("User não encontrado");
  // }

  // let tasks =  await this._cacheRepository.get<Task[]>(`tasks:${userId}`)

  // if(!tasks){
  //     tasks = await this._taskRepository.getTasks(userId, description, archived)
  //     await this._cacheRepository.set(`tasks:${userId}`, tasks.map(task => task.toJson()))
  // }

  async getTasks(userId: string, description?: string, archived?: string) {
    const userExists = await this.user.verifyUserExistsById(userId);
    if (!userExists) {
        throw new Error("User não encontrado");
    }

    let whereParams: { userId: string; description?: string; archived?: boolean; } = { userId };

    if (archived) {
        whereParams = {
            ...whereParams,
            archived: archived === "true" ? true : false,
        };
    };

    if (description) {
        whereParams = {
          ...whereParams,
          description,
        };
    };

    const tasks = await this.prisma.task.findMany({
      where: {
        fk_id_user: userId,
        description: whereParams.description,
        archived: whereParams.archived
      }
    });

    return tasks;
  }

  async editTask(userId:string, id: string, description: string, detail: string) {
    const userExists = await this.user.verifyUserExistsById(userId);
    if (!userExists) {
        throw new Error("User não encontrado");
    }

    const taskExists = await this.verifyTaskExistById(id);
    if (!taskExists) {
        throw new Error("Recado não encontrado");
    }

    await this.prisma.task.update(
      {
        where: {
          id
        },
        data: {
          description,
          detail,
          update_at: new Date()
        }
      }
    )

    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }

  async removeTask(userId:string, id: string) {
    const userExists = await this.user.verifyUserExistsById(userId);
    if (!userExists) {
        throw new Error("User não encontrado");
    }

    const taskExists = await this.verifyTaskExistById(id);
    if (!taskExists) {
        throw new Error("Recado não encontrado");
    }

    const task = await this.prisma.task.delete({
        where: {
            id
        }
    })

    return task;
  }

  async updateArchived(userId: string, id: string, archived: boolean) {
    const userExists = await this.user.verifyUserExistsById(userId);
    if (!userExists) {
        throw new Error("User não encontrado");
    }

    const taskExists = await this.verifyTaskExistById(id);
    if (!taskExists) {
        throw new Error("Recado não encontrado");
    }

    console.log(archived)
    await this.prisma.task.update(
      {
        where: {
          id
        },
        data: {
          archived: Boolean(archived)
        }
      }
    )

    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }

  async verifyTaskExistById(id: string) {
      const task = await this.prisma.task.findUnique({
          where: {
              id
          }
      });

      return !!task
  }
}
