import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { writeFile } from 'fs/promises';
import { UUID } from 'crypto';
import { UserService } from '../users/user.service';
import { DatabaseService } from '../database/database.service';

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
export class CliService {
  constructor(
    private userService: UserService,
    private db: DatabaseService,
  ) {}
  async createUser(email: string, password: string) {
    //Hash password
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user: User = {
        id: crypto.randomUUID(),
        email: email,
        password: hashedPassword,
        todos: [],
      };
      this.db.data.users.push(user);
      await this.db.save();

      console.log('User created.');
    } catch (err) {
      console.log('There was an error.', err);
    }
  }
}
