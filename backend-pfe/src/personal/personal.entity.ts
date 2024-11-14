// src/personal/personal.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity'; // Adjust the import path as necessary
import { Intervention } from '../intervention/intervention.entity';
import { ConversationMessage } from 'src/Conversation/conversation.entity';

@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  idPersonal: number;

  @Column()
  idUser: number;

  @ManyToOne(() => User, user => user.personals) // Assuming User has a 'personals' collection
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column({ length: 255 })
  nom: string;

  @Column({ length: 255 })
  prenom: string;

  @Column({ length: 255 })
  position: string;

  // OneToMany relationship to Intervention
  @OneToMany(() => Intervention, intervention => intervention.personal)
  interventions: Intervention[];

  @OneToMany(() => ConversationMessage, (message) => message.personal)
  messages: ConversationMessage[];
}
