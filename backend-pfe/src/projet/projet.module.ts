import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from '../projet/projet.entity'
import { ProjectService } from '../projet/projet.service'
import { ProjectController } from '../projet/projet.controller'
import { TicketService } from 'src/ticket/ticket.service'
import { Ticket } from 'src/ticket/ticket.entity'
import { Client } from 'src/client/client.entity'
import { Notification } from 'src/notification/notification.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Notification, Project, Ticket]) // Include Ticket entity in TypeOrmModule
  ],
  providers: [
    ProjectService,
    TicketService // Add TicketService to providers
  ],
  controllers: [ProjectController]
})
export class ProjectModule {}
