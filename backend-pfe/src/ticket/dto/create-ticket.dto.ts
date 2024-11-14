import { TicketStatus } from '../ticket.entity';

export class CreateTicketDto {
  idProject: number;
  idClient: number;
  idType: number;
  description: string;
  date: Date;
  status: TicketStatus;
}
