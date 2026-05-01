import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth/auth.controller';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'It is a secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService, JwtModule],
})
export class UserModule {}
