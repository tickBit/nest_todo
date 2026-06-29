import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UUID } from 'crypto';
import { Todo } from '../todos/interface/todo.interface';

type User = {
  id: UUID;
  email: string;
  password: string;
  todos: Todo[];
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password } = signupData;

    //Check if email is in use
    const user: User | null = this.userService.findEmail(email);
    if (user?.email === email) {
      throw new BadRequestException('Email already in use');
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document and save in mongodb
    const newUser = await this.userService.create(email, hashedPassword);
    return { newUser, message: 'User created successfully' };
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user: User | null = this.userService.findEmail(email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Generate JWT token
    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
