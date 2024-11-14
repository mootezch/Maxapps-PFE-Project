// src/client/client.module.ts

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { Client } from './client.entity'
import { Project } from 'src/projet/projet.entity'
import { Ticket } from 'src/ticket/ticket.entity'
import { ConversationMessage } from 'src/Conversation/conversation.entity'
import { Notification } from 'src/notification/notification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Notification, ConversationMessage, Client, Project, Ticket])],
  providers: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
