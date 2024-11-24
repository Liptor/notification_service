import { AppService } from './app.service';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('get_notification')
  getHello(): string {
    return this.appService.getHello();
  }
}
