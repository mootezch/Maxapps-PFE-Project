import { IsString, IsDate, IsInt, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsDate()
  @IsOptional()
  deadline?: Date;

  @IsInt()
  @IsOptional()
  idUser?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
