import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AddTodoDto } from './dto/add-todo.dto';

/*
    The "database" and its methods
*/

interface Todo {
  id: string;
  todoName: string;
  done: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getAll() {
    // return todos as json data
    return this.todos;
  }

  addTodo(todo: AddTodoDto) {
    const newTodo: Todo = {
      id: randomUUID(),
      todoName: todo.todoText,
      done: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  toggleDone(id: string) {
    if (this.todos.length === 0) return;
    this.todos.forEach((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    });
  }

  deleteTodo(id: string) {
    if (this.todos.length === 0) return;
    this.todos.forEach((todo, i) => {
      if (todo.id === id) {
        this.todos.splice(i, 1);
      }
    });
  }
}
