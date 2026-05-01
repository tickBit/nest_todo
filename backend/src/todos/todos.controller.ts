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
import { JwtAuthGuard } from '../auth/Guards/JwtGuard';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.todosService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addTodo(@Body() addTodoItem: AddTodoDto) {
    return this.todosService.addTodo(addTodoItem);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTodo(@Param('id') id: string): void {
    return this.todosService.deleteTodo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  toggleDone(@Param('id') id: string) {
    return this.todosService.toggleDone(id);
  }
}
