import { Module } from '@nestjs/common';
import { CliService } from './cli.service';
import { UserService } from '../users/user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, CliService],
})
export class CreateModule {}
