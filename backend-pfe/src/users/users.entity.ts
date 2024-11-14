import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm'
import { Project } from '../projet/projet.entity'
import { Client } from 'src/client/client.entity'
import { Personal } from 'src/personal/personal.entity'
import { Notification } from 'src/notification/notification.entity'
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  idUser: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: ['client', 'personnel'],
    default: 'client'
  })
  role: 'client' | 'personnel'

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean

  @OneToOne(() => Client, (client) => client.user, { onDelete: 'CASCADE' })
  client: Client

  @OneToOne(() => Notification, (notification) => notification.user)
  token: Notification

  @OneToMany(() => Personal, (personal) => personal.user, { onDelete: 'CASCADE' })
  personals: Personal[]
}
