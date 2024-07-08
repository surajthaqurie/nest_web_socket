import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class GatewayService {
  @WebSocketServer()
  socket: Socket;

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    this.socket.except(client.id).emit('message', body);
  }
}
