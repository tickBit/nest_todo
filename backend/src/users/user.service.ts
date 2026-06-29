import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UUID } from 'crypto';

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
export class UserService {
  constructor(private db: DatabaseService) {}

  list() {
    return this.db.data;
  }

  async create(email: string, password: string) {
    const user: User = { id: crypto.randomUUID(), email, password, todos: [] };
    this.db.data.users.push(user);
    await this.db.save();
    return user;
  }

  findEmail(email: string): User | null {
    if (this.db.data !== null) {
      const user = this.db.data.users.find((user) => user.email === email);
      if (user!) return user;
    }
    return null;
  }
}
