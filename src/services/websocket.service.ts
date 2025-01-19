import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class JobGateway {
  private constructor();

  @SubscribeMessage('')
  sendEvent() {}
}
