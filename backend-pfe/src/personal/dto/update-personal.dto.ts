// src/personal/dto/update-personal.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalDto } from './create-personal.dto';

export class UpdatePersonalDto extends PartialType(CreatePersonalDto) {}
