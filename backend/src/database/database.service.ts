import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
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

type DBSchema = {
  users: Array<User>;
};

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db!: Low<DBSchema>;

  async onModuleInit() {
    const adapter = new JSONFile<DBSchema>('db.json');

    this.db = new Low(adapter, { users: [] });

    await this.db.read();

    this.db.data ??= { users: [] };
    await this.db.write();
  }

  get data() {
    return this.db.data;
  }

  async save() {
    await this.db.write();
  }

  onModuleDestroy() {}
}
