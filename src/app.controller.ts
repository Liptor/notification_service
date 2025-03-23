import { Body, Controller, Get, Post } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { AppService } from './app.service';
import { JobReq } from './dtos/job.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/new-task')
  async postTask(@Body() task: JobReq): Promise<Notification> {
    return this.appService.postNewTask(task);
  }

  @Get()
  async getTasks(): Promise<Notification[]> {
    return this.appService.getAllTasks();
  }
}
