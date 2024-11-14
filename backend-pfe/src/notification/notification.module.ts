import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { Notification } from './notification.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]) // Include Ticket entity in TypeOrmModule
  ],

  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
