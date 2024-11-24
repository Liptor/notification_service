import { Injectable } from '@nestjs/common';

import { Notification, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly database: PrismaClient) {}

  async getHello(task: Notification): Promise<Notification> {
    const { title, content, schedule_type, interval } = task;

    return await this.database.notification.create({
      data: {
        title,
        content,
        schedule_type,
        interval,
      },
    });
  }
}
