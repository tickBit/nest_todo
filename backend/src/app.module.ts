import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
