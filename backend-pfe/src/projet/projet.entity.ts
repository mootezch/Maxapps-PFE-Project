// src/project/project.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from '../users/users.entity'
import { Ticket } from '../ticket/ticket.entity'
import { Client } from 'src/client/client.entity'
import { ConversationMessage } from 'src/Conversation/conversation.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  nom: string

  @Column({ type: 'date' })
  deadline: Date

  @Column()
  idClient: number

  @ManyToOne(() => Client, (client) => client.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idClient' })
  client: Client

  @OneToMany(() => Ticket, (ticket) => ticket.project, { cascade: true })
  tickets: Ticket[]

  @Column({ length: 255 })
  description: string

  @Column({ length: 255 })
  status: string

  @OneToMany(() => ConversationMessage, (message) => message.project)
  messages: ConversationMessage[]
}
