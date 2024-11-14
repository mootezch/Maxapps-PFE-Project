// src/ticket/ticket.service.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ticket } from './ticket.entity'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto)
    return await this.ticketRepository.save(ticket)
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find({ relations: ['project.client'] })
  }

  async findOne(id: number): Promise<Ticket | undefined> {
    // Corrected call to findOne
    return await this.ticketRepository.findOne({ where: { idTicket: id } })
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket | undefined> {
    await this.ticketRepository.update(id, updateTicketDto)
    // Corrected call to findOne
    return await this.ticketRepository.findOne({ where: { idTicket: id } })
  }

  async remove(id: number): Promise<void> {
    await this.ticketRepository.delete(id)
  }
}
