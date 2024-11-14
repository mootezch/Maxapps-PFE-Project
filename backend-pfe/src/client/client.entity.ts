// src/client/client.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from '../users/users.entity'
import { Intervention } from 'src/intervention/intervention.entity'
import { Project } from 'src/projet/projet.entity'
import { ConversationMessage } from 'src/Conversation/conversation.entity'

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  idClient: number

  @Column()
  idUser: number

  @OneToOne(() => User, (user) => user.client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUser' })
  user: User

  @Column({ length: 255 })
  nom: string

  @Column({ length: 255 })
  prenom: string

  @Column({ length: 15, nullable: true })
  telephone: string

  @Column({ type: 'text', nullable: true })
  adresse: string

  @OneToMany(() => Project, (project) => project.client, { onDelete: 'CASCADE' })
  projects: Project[]

  @OneToMany(() => Intervention, (intervention) => intervention.client)
  interventions: Intervention[]

  @OneToMany(() => ConversationMessage, (message) => message.client, { onDelete: 'CASCADE' })
  messages: ConversationMessage[]
}
