// src/Conversation/conversation.controller.ts

import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationMessageDto } from './dto/create-message.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':ticketId')
  async getMessagesByTicket(@Param('ticketId') ticketId: number) {
    return await this.conversationService.findAllMessagesForTicket(ticketId);
  }

  @Post()
  async addMessage(@Body() createConversationMessageDto: CreateConversationMessageDto) {
    return await this.conversationService.createMessage(createConversationMessageDto);
  }

  
}
