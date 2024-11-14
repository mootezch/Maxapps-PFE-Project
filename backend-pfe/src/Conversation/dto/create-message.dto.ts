// src/conversation/dto/create-conversation-message.dto.ts

import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Sender } from '../conversation.entity'

export class CreateConversationMessageDto {

  @IsString()
  @IsNotEmpty()
  message: string

  @IsNumber()
  @IsNotEmpty()
  idTicket: number

  @IsNumber()
  @IsOptional()
  idPersonal?: number
}
