import { Injectable } from '@nestjs/common';
import { parseExpression } from 'cron-parser';
import { Notification, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly database: PrismaClient) {}

  async postNewTask(task: Notification): Promise<Notification> {
    const { title, content, schedule_type, repeat } = task;

    try {
      const cronParse = parseExpression(schedule_type);

      const nextExecutionTime = cronParse.next().toDate();

      return await this.database.notification.create({
        data: {
          title,
          content,
          schedule: schedule_type,
          schedule_type,
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
