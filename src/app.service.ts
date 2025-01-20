import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Notification, PrismaClient } from '@prisma/client';
import {
  calculateProcessEvery,
  calculateProcessEveryInterval,
} from './utils/proccessEvery';
import { JobGateway } from './services/websocket.service';

@Injectable()
export class AppService {
  constructor(
    private readonly database: PrismaClient,
    private schedulerRegistry: SchedulerRegistry,
    private jobWebsocket: JobGateway,
  ) {}

  async postNewTask(task: Notification): Promise<Notification> {
    const { title, content, startAt, repeatAt, repeatInterval } = task;

    try {
      if (repeatInterval) {
        await this.database.notification.create({
          data: {
            title,
            content,
            startAt,
            repeatAt,
            repeatInterval,
          },
        });

        const milliseconds = calculateProcessEveryInterval(repeatInterval);
        this.addCronInterval(title, content, milliseconds);

        return;
      } else {
        await this.database.notification.create({
          data: {
            title,
            content,
            startAt,
          },
        });

        this.addCronJob(title, content, startAt);
        return;
      }
    } catch (error) {
      throw new Error(`Invalid schedule_type: ${error.message}`);
    }
  }

  private addCronJob(title: string, content: string, value: string) {
    const valueNum = calculateProcessEvery(value);

    const job = new CronJob(`${valueNum} * * * * *`, () => {
      this.jobWebsocket.sendEvent(title, content);

      this.schedulerRegistry.deleteCronJob(title);
    });

    this.schedulerRegistry.addCronJob(title, job);
    job.start();
  }

  private addCronInterval(
    title: string,
    content: string,
    milliseconds: number,
  ) {
    const interval = setInterval(
      () => this.jobWebsocket.sendEvent(title, content),
      milliseconds,
    );

    this.schedulerRegistry.addInterval(title, interval);
  }

  async getAllTasks(): Promise<Notification[]> {
    return await this.database.notification.findMany();
  }
}
