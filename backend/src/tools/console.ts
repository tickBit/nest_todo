import { NestFactory } from '@nestjs/core';
import { CreateModule } from './create.module';
import { CliService } from './cli.service';

async function bootstrap() {
  const create = await NestFactory.createApplicationContext(CreateModule);

  const [, , command, ...args] = process.argv;

  const cli = create.get(CliService);

  switch (command) {
    case 'createUser':
      await cli.createUser(args[0], args[1]);
      break;

    default:
      console.log('Unknown command:', command);
      console.log('Available commands: createUser <email> <password>');
  }

  await create.close();
}

bootstrap();
