import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("/:userId/tasks")
  async create(@Param('userId') userId: string, @Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(createTaskDto, userId);
    } catch (error) { 
      throw new HttpException({
        status: 404,
        error: error.message,
      }, 404, {
        cause: error
      });
    }
  }

  @Get("/:userId/tasks")
  async getTask(@Param('userId') userId: string, @Body() getTaskDto: GetTaskDto) {
    try {
      return await this.tasksService.getTasks(userId, getTaskDto.description, getTaskDto.archived);
    } catch (error) { 
      throw new HttpException({
        status: 404,
        error: error.message,
      }, 404, {
        cause: error
      });
    }
  }

  @Put('/:userId/tasks/:id')
  async update(@Param("userId") userId: string, @Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.tasksService.editTask(userId, id, updateTaskDto.description, updateTaskDto.detail);
    } catch (error) { 
      throw new HttpException({
        status: 404,
        error: error.message,
      }, 404, {
        cause: error
      });
    }
  }

  @Delete('/:userId/tasks/:id')
  async remove(@Param("userId") userId: string, @Param("id") id: string) {
    try {
      return await this.tasksService.removeTask(userId, id);
    } catch (error) { 
      throw new HttpException({
        status: 404,
        error: error.message,
      }, 404, {
        cause: error
      });
    }
  }

  @Put('/:userId/tasks/:id/archived')
  async changeStatusArchived(@Param("userId") userId: string, @Param("id") id: string, @Body() archived: boolean) {
    try {
      return await this.tasksService.updateArchived(userId, id, archived);
    } catch (error) { 
      throw new HttpException({
        status: 404,
        error: error.message,
      }, 404, {
        cause: error
      });
    }
  }
}
