import { AppService } from './app.service';
import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  // @SubscribeMessage('get_notification')
  // getHello(): string {
  //   this.appService.getAllTasks();
  // }
}
