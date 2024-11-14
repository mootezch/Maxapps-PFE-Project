// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Client } from 'src/client/client.entity';
import { UserSelectionService } from './user-selection.service';
import { UsersController } from './users.controller';
import { Notification } from 'src/notification/notification.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Notification])],
  providers: [UsersService, UserSelectionService],
  exports: [UsersService, UserSelectionService],
  controllers: [UsersController],
})
export class UsersModule {}
