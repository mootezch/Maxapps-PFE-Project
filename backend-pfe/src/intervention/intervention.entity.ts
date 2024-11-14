// src/intervention/intervention.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Personal } from '../personal/personal.entity' // Adjust path as necessary
import { Ticket } from '../ticket/ticket.entity' // Ensure you import Ticket entity
import { Client } from 'src/client/client.entity'

export enum InterventionStatus {
  Resolved = 'resolved',
  Unresolved = 'unresolved'
}

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  idIntervention: number

  @Column()
  idClient: number // Just an ID, no direct ORM relationship

  @Column()
  idPersonal: number

  @ManyToOne(() => Personal, (personal) => personal.interventions)
  @JoinColumn({ name: 'idPersonal' })
  personal: Personal

  @Column()
  idTicket: number

  @ManyToOne(() => Ticket, (ticket) => ticket.interventions) // Assuming Ticket has an 'interventions' collection
  @JoinColumn({ name: 'idTicket' })
  ticket: Ticket

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'datetime' })
  date: Date

  @Column({
    type: 'enum',
    enum: InterventionStatus,
    default: InterventionStatus.Unresolved
  })
  status: InterventionStatus

  @ManyToOne(() => Client, (client) => client.interventions) // Define relationship with Client
  @JoinColumn({ name: 'idClient' })
  client: Client
}
