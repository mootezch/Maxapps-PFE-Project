import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config' // Import ConfigModule and ConfigService
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProjectModule } from './projet/projet.module'
import { TicketModule } from './ticket/ticket.module'
import { ClientModule } from './client/client.module'
import { InterventionModule } from './intervention/intervention.module'
import { PersonalModule } from './personal/personal.module'
import { ConversationModule } from './Conversation/conversation.module'
import { NotificationModule } from './notification/notification.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // Make ConfigModule global
    }),
    AuthModule,
    UsersModule,
    ProjectModule,
    TicketModule,
    ClientModule,
    InterventionModule,
    PersonalModule,
    ConversationModule,
    NotificationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true // NOTE: This should be set to false in production
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
