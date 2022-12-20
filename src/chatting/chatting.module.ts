import { Module } from '@nestjs/common';
import { ChattingGateway } from './chatting.gateway';

@Module({
  providers: [ChattingGateway],
})
export class ChattingModule {}
