// src/conversation/conversation.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Ticket } from '../ticket/ticket.entity'
import { Client } from '../client/client.entity'
import { Personal } from '../personal/personal.entity'
import { Project } from 'src/projet/projet.entity'

export enum Sender {
  Client = 'client',
  Personal = 'personal'
}

@Entity()
export class ConversationMessage {
  @PrimaryGeneratedColumn()
  idMessage: number

  @Column({
    type: 'enum',
    enum: Sender
  })
  sender: Sender

  @Column({ type: 'text' })
  message: string

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date

  @ManyToOne(() => Ticket, (ticket) => ticket.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idTicket' })
  ticket: Ticket

  @ManyToOne(() => Client, (client) => client.messages)
  @JoinColumn({ name: 'idClient' })
  client: Client

  @ManyToOne(() => Personal, (personal) => personal.messages)
  @JoinColumn({ name: 'idPersonal' })
  personal: Personal

  @ManyToOne(() => Project, (project) => project.messages)
  @JoinColumn({ name: 'idProjet' })
  project: Project
}
