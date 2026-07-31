import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordLessLoginDto } from './dto/passwordless-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return await this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return await this.authService.login(credentials);
  }

  @Post('login-with-email')
  loginWithCodeRequest(
    @Body(ValidationPipe) passwordLessLoginDto: PasswordLessLoginDto,
  ) {
    const { email } = passwordLessLoginDto;
    return this.authService.loginWithCodeRequest(email);
  }

  @Get(':code/:email')
  redirectToFrontend(
    @Param('code') code: string,
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
    return res.redirect(
      `${frontendUrl}/auth/callback?code=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}`,
    );
  }

  @Get('login-with-code/:code/:email')
  loginWithCode(@Param('code') code: string, @Param('email') email: string) {
    return this.authService.loginWithCode(email);
  }
}
