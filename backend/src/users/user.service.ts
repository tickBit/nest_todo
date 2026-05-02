import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

export interface User {
  id: UUID;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];

  findOne(id: UUID) {
    return this.users.find((user) => user.id === id);
  }
  findEmail(email: string): User | null {
    const user = this.users.find((user) => user.email === email);
    if (user) return user;
    else return null;
  }
  addUser(user: User) {
    return this.users.push(user);
  }
}
