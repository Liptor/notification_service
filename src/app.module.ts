import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { ScheduleModule } from '@nestjs/schedule';
import { JobGateway } from './services/websocket.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, JobGateway, PrismaClient],
})
export class AppModule {}
