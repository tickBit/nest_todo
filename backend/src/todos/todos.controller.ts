import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

import { AddTodoDto } from './dto/add-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.getAll();
  }

  @Post()
  addTodo(@Body() addTodoItem: AddTodoDto) {
    return this.todosService.addTodo(addTodoItem);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): void {
    return this.todosService.deleteTodo(id);
  }

  @Get(':id')
  toggleDone(@Param('id') id: string) {
    return this.todosService.toggleDone(id);
  }
}
