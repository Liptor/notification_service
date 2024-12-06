import { Injectable } from '@nestjs/common';
import { parseExpression } from 'cron-parser';
import { Notification, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly database: PrismaClient) {}

  async postNewTask(task: Notification): Promise<Notification> {
    const { title, content, schedule, repeat } = task;

    try {
      const cronParse = parseExpression(schedule);

      const nextExecutionTime = cronParse.next().toDate();

      return await this.database.notification.create({
        data: {
          title,
          content,
          schedule,
          interval: repeat ? nextExecutionTime.getTime() : null,
          repeat,
        },
      });
    } catch (error) {
      throw new Error(`Invalid schedule_type: ${error.message}`);
    }
  }

  async getAllTasks(): Promise<Notification[]> {
    return await this.database.notification.findMany();
  }
}
