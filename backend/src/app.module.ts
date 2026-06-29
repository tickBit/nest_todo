import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
