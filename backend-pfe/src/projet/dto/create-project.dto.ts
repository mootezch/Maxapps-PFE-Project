import { IsString, IsDate, IsInt } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  nom: string

  @IsDate()
  deadline: Date

  @IsInt()
  idClient: number

  @IsString()
  description: string

  @IsString()
  status: string
}
