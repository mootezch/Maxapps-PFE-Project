// src/conversation/conversation.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConversationMessage } from './conversation.entity'
import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'
import { Ticket } from 'src/ticket/ticket.entity'
import { Client } from 'src/client/client.entity'
import { Personal } from 'src/personal/personal.entity'
import { Project } from 'src/projet/projet.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ConversationMessage, Ticket, Client, Personal, Project])],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule {}
