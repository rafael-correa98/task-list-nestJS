import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { verifySizeUserId } from './middleware/verifySizeUserId.middleware';
import { validateDescriptDetailParamsTask } from './middleware/validateDescriptDetailParamsTask.middleware';
import { UsersModule } from 'src/users/users.module';
import { verifySizeId } from './middleware/VerifySizeId.middleware';
import { validateArchivedParams } from './middleware/validateArchivedParams.middleware';

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService]
})

export class TasksModule implements NestModule {
  constructor(private tasksServices: TasksService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(verifySizeUserId, validateDescriptDetailParamsTask)
      .forRoutes({ path: ':userId/tasks', method: RequestMethod.POST });
    consumer
      .apply(verifySizeUserId)
      .forRoutes({ path: ':userId/tasks', method: RequestMethod.GET });
    consumer
      .apply(validateDescriptDetailParamsTask, verifySizeUserId, verifySizeId)
      .forRoutes({ path: '/:userId/tasks/:id', method: RequestMethod.PUT });
    consumer
      .apply(verifySizeUserId, verifySizeId)
      .forRoutes({ path: '/:userId/tasks/:id', method: RequestMethod.DELETE });
    consumer
      .apply(verifySizeUserId, verifySizeId, validateArchivedParams)
      .forRoutes({ path: '/:userId/tasks/:id/archived', method: RequestMethod.PUT });
  }
}
