import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { randomBytes, UUID } from 'crypto';
import { Todo } from '../todos/interface/todo.interface';
import { Logger } from '@nestjs/common';

type User = {
  id: UUID;
  email: string;
  password: string;
  todos: Todo[];
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signup(
    signupData: SignupDto,
  ): Promise<{ newUser: User; message: string }> {
    const { email, password } = signupData;

    //Check if email is in use
    const user = this.usersService.findEmail(email);
    if (user?.email === email) {
      throw new BadRequestException('Email already in use');
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document and save in mongodb
    const newUser = await this.usersService.create(email, hashedPassword);
    return { newUser, message: 'User created successfully' };
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user: User | null = this.usersService.findEmail(email);
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
  validateUser(email: string): User | null {
    const user: User | null = this.usersService.findEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  loginWithCodeRequest(email: string) {
    const user = this.usersService.findEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.getLoginWithCode(email);
  }

  getLoginWithCode(email: string) {
    const user = this.usersService.findEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = randomBytes(16).toString('hex');

    return {
      message: `Here's the magic link to login:\nhttp://localhost:3000/auth/${code}/${email}`,
      link: `http://localhost:3000/auth/${code}/${email}`,
    };
  }

  loginWithCode(email: string) {
    const user = this.usersService.findEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
