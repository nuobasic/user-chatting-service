import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class ChattingGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(ChattingGateway.name);

  @WebSocketServer()
  server: Server;

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    //연결이 끊기면 실행
    ChattingGateway.logger.debug(`disconnected`);
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    //연결이 진행되면 실행
    ChattingGateway.logger.debug(`connceted`);
  }

  afterInit() {
    ChattingGateway.logger.debug(`Socket Server Init`); //constructor 다음에 실행
  }

  @SubscribeMessage('clientServer')
  async handleMessage(
    @MessageBody() paylod: { name: string; text: string },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.emit('server', paylod);
  }
}
