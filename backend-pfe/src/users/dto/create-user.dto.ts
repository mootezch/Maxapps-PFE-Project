// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nom: string

  @IsString()
  @IsNotEmpty()
  prenom: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  mobile: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsNotEmpty()
  push_token: string
}
