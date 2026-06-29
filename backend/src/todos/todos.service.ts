import { Injectable } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { DatabaseService } from '../database/database.service';
import { randomUUID, UUID } from 'crypto';

/*
    The "database" and its methods
*/

type Todo = {
  id: UUID;
  todoName: string;
  done: boolean;
};

type User = {
  id: UUID;
  email: string;
  password: string;
  todos: Todo[];
};

@Injectable()
export class TodosService {
  constructor(private db: DatabaseService) {}

  getAll(userId: UUID) {
    // return todos as json data
    const user: User | undefined = this.db.data.users.find((user) =>
      user.id === userId ? user : null,
    );

    if (user) return user.todos;
    else return null;
  }

  async addTodo(todo: AddTodoDto) {
    const newTodo: Todo = {
      id: randomUUID(),
      todoName: todo.todoText,
      done: false,
    };
    console.log(todo.todoText);

    const user = this.db.data.users.find((u) => u.id === todo.userId);

    console.log(user?.id, todo.userId);
    console.log(user);

    user?.todos.push(newTodo);

    await this.db.save();
    return newTodo;
  }

  async toggleDone(userId: string, id: string) {
    if (!this.db.data.users?.length) return;

    const user = this.db.data.users.find((u) => u.id === userId);
    if (!user) return;

    const todo = user.todos.find((t) => t.id === id);
    if (!todo) return;

    todo.done = !todo.done;

    await this.db.save();
    return user.todos;
  }

  async deleteTodo(userId: string, id: string) {
    if (!this.db.data.users?.length) return;

    const user = this.db.data.users.find((u) => u.id === userId);
    if (!user) return;

    const todos = user.todos.filter((t) => t.id !== id);

    user.todos = todos;

    await this.db.save();
    return todos;
  }
}
