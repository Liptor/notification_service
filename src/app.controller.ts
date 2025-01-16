import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/new-task')
  async postNewTask(@Body() task): Promise<Notification> {
    return this.appService.postNewTask(task);
  }

  @Get()
  async getTasks(): Promise<Notification[]> {
    return this.appService.getAllTasks();
  }
}
