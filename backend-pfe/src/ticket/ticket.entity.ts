import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Project } from '../projet/projet.entity'
import { Intervention } from 'src/intervention/intervention.entity'
import { ConversationMessage } from 'src/Conversation/conversation.entity'

export enum TicketStatus {
  Open = 'open',
  Closed = 'closed'
}

export enum PriorityStatus {
  Low = 'low',
  Meduim = 'meduim',
  High = 'high',
  Urgent = 'urgent'
}

// Newly defined enum for ticket types
export enum TicketType {
  Reclamation = 'reclamation',
  Demande = 'demande'
  // Add other types as necessary
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  idTicket: number

  @ManyToOne(() => Project, (project) => project.tickets, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  project: Project

  @Column()
  idClient: number

  @Column({ type: 'text', nullable: true })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @CreateDateColumn({ type: 'datetime' })
  date: Date

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.Open
  })
  status: TicketStatus

  // New enum column for type of ticket
  @Column({
    type: 'enum',
    enum: TicketType,
    default: TicketType.Demande
  })
  typeTicket: TicketType

  @Column({
    type: 'enum',
    enum: PriorityStatus,
    default: PriorityStatus.Low
  })
  priority: PriorityStatus

  // OneToMany relationship to Intervention
  @OneToMany(() => Intervention, (intervention) => intervention.ticket)
  interventions: Intervention[]

  @OneToMany(() => ConversationMessage, (message) => message.ticket)
  messages: ConversationMessage[]
}
