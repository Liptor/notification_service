import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class JobGateway {
  @SubscribeMessage('task')
  sendEvent(@MessageBody() title: string, content: string) {
    return { title, content };
  }
}
