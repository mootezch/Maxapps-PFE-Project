// src/intervention/dto/create-intervention.dto.ts

import { InterventionStatus } from "../intervention.entity";

export class CreateInterventionDto {
    idClient: number;
    idPersonal: number;
    idTicket: number;
    description?: string;
    date: Date;
    status: InterventionStatus;
  }