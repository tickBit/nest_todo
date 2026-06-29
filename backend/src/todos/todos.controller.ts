import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AddTodoDto } from './dto/add-todo.dto';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { UUID } from 'crypto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param('id') id: UUID) {
    return this.todosService.getAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addTodo(@Body() addTodoItem: AddTodoDto) {
    return this.todosService.addTodo(addTodoItem);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:userId/id')
  deleteTodo(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todosService.deleteTodo(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId/id')
  toggleDone(@Param('userId') userId: string, @Param('id') id: string) {
    return this.todosService.toggleDone(userId, id);
  }
}
