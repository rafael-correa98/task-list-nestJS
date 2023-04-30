import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { validateUserCreateUser } from './middleware/validateUserCreateUser.middleware';
import { validateSize } from './middleware/validateSize.middleware';
import { different } from './middleware/different.middleware';
import { validateParamsLogin } from './middleware/validateParamsLogin.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})

export class UsersModule implements NestModule {
  constructor(private usersServices: UsersService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateUserCreateUser, validateSize, different)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer
      .apply(validateParamsLogin)
      .forRoutes({ path: 'users/login', method: RequestMethod.POST });
  }
}