import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
