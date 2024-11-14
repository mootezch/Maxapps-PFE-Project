// src/Conversation/conversation.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConversationMessage } from './conversation.entity'
import { CreateConversationMessageDto } from './dto/create-message.dto'
import { Ticket } from 'src/ticket/ticket.entity'
import { Client } from 'src/client/client.entity'
import { Personal } from 'src/personal/personal.entity'
import { Project } from 'src/projet/projet.entity'
import { Sender } from './conversation.entity'
import { sendPushNotification } from 'src/utils/expo.api'
@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationMessage)
    private conversationRepository: Repository<ConversationMessage>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async createMessage(createConversationMessageDto: CreateConversationMessageDto): Promise<any> {
    const { idTicket, idPersonal, message } = createConversationMessageDto

    // Fetch related entities by their IDs
    const ticket: Ticket = await this.ticketRepository.findOne({
      where: { idTicket: idTicket },
      relations: ['project']
    })

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${idTicket} not found.`)
    }

    // Fetch related entities by their IDs
    const project: Project = await this.projectRepository.findOne({ where: { id: ticket.project.id } })

    if (!project) {
      throw new NotFoundException(`Project  not found.`)
    }

    let client: Client = await this.clientRepository.findOne({
      where: { idClient: ticket.idClient },
      relations: ['user.token']
    })
    if (!client) {
      throw new NotFoundException(`Client not found.`)
    }

    let sender: Sender = Sender.Client

    let personal: Personal
    if (idPersonal) {
      personal = await this.personalRepository.findOne({ where: { idPersonal: idPersonal } })

      sender = Sender.Personal
      if (!personal) {
        throw new NotFoundException(`Personal with id ${idPersonal} not found.`)
      }

      console.log(client?.user)

      if (client?.user?.token != null) {

        console.log("send not")
        let userPushToken = client.user.token

        let send_obj = {
          to: userPushToken.token,
          title: 'Nouveau message',
          body: 'Vous avez récu un nouveau message'
        }
        await sendPushNotification(send_obj)
      }
    }

    // Create the conversation message entity
    const conversationMessage = new ConversationMessage()
    conversationMessage.sender = sender
    conversationMessage.message = message
    conversationMessage.ticket = ticket
    conversationMessage.client = client // Optional, can be null if idClient is not provided
    conversationMessage.personal = personal // Optional, can be null if idPersonal is not provided
    conversationMessage.project = project

    return await this.conversationRepository.save(conversationMessage)
  }

  async findAllMessagesForTicket(ticketId: number): Promise<any> {
    return await this.ticketRepository.findOne({
      where: { idTicket: ticketId },
      relations: ['project', 'project.client', 'messages']
    })
  }
}
