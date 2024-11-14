// src/client/client.service.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Client } from './client.entity'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { Project } from 'src/projet/projet.entity'
import { Ticket } from 'src/ticket/ticket.entity'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) {}

  async myProjects(user) {
    return await this.projectRepository.find({ where: { idClient: user.idClient }, relations: ['tickets'] })
  }

  async myProjectById(user, id) {
    return await this.projectRepository.findOne({ where: { id, idClient: user.idClient }, relations: ['tickets'] })
  }

  async myTicketMessages(user, idTicket) {
    return await this.ticketRepository.findOne({
      where: { idTicket: idTicket, idClient: user.idClient },
      relations: ['messages', 'messages.client', 'messages.personal']
    })
  }

  async addTicket(user, id, body) {
    return await this.ticketRepository.insert({
      idClient: user.idClient,
      typeTicket: body.typeTicket,
      title: body.title,
      priority: body.priority,
      description: body.description,
      project: id
    })
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto)
    return await this.clientRepository.save(client)
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: { user: true },
      select: { user: { email: true, status: true } }
    })
  }

  async findOne(id: number): Promise<Client | undefined> {
    return await this.clientRepository.findOne({ where: { idClient: id } })
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientRepository.update(id, updateClientDto)
    return await this.clientRepository.findOne({ where: { idClient: id } })
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id)
  }
}
