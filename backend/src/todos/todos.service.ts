import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AddTodoDto } from './dto/add-todo.dto';

/*
    The "database" and its methods
*/

@Injectable()
export class TodosService {
  private todos = [
    {
      id: randomUUID(),
      todoName: 'Go fishing',
      done: false,
    },
  ];

  getAll() {
    // return todos as json data
    return this.todos;
  }

  addTodo(todo: AddTodoDto) {
    const newTodo = {
      id: randomUUID(),
      todoName: todo.todoText,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  toggleDone(id: string) {
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });
  }

  deleteTodo(id: string) {
    this.todos.forEach((todo, i) => {
      if (todo.id === id) {
        this.todos.splice(i, 1);
      }
    });
  }
}
