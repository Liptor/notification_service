import { Controller, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/new-task')
  async getHello(task: Notification): Promise<Notification> {
    return this.appService.getHello(task);
  }  
}
