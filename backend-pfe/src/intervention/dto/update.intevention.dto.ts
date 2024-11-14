// src/intervention/dto/update-intervention.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateInterventionDto } from './create-intervention.dto';

export class UpdateInterventionDto extends PartialType(CreateInterventionDto) {}
