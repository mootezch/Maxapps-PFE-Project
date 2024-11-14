import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, Unique, OneToMany } from 'typeorm'
import { User } from '../users/users.entity'

@Entity('user_notifications')
@Unique(['token', 'user'])
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  token: string

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({ name: 'idUser' })
  user: User
}
