import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Notification, PrismaClient } from '@prisma/client';
import { calculateProcessEvery } from './utils/proccessEvery';
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
        const milliseconds = calculateProcessEvery(repeatInterval);
        this.addCronInterval(title, milliseconds);

        return await this.database.notification.create({
          data: {
            title,
            content,
            startAt,
            repeatAt,
            repeatInterval,
          },
        });
      } else {
        this.addCronJob(title, startAt);

        return await this.database.notification.create({
          data: {
            title,
            content,
            startAt,
          },
        });
      }
    } catch (error) {
      throw new Error(`Invalid schedule_type: ${error.message}`);
    }
  }

  private addCronJob(name: string, value: string) {
    const valueNum = calculateProcessEvery(value);

    const job = new CronJob(`${valueNum} * * * * *`, () => {
      return;
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  private addCronInterval(name: string, milliseconds: number) {
    const interval = setInterval(() => {}, milliseconds);

    this.schedulerRegistry.addInterval(name, interval);
  }

  async getAllTasks(): Promise<Notification[]> {
    return await this.database.notification.findMany();
  }
}
