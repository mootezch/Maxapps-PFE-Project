import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post('add')
    create(@Body() createTicketDto: CreateTicketDto) {
        console.log('Creating a ticket:', createTicketDto);
        return this.ticketService.create(createTicketDto);
    }

    @Get()
    findAll() {
        console.log('Fetching all tickets');
        return this.ticketService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        console.log('Fetching ticket with id:', id);
        return this.ticketService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
        console.log('Updating ticket with id:', id, updateTicketDto);
        return this.ticketService.update(id, updateTicketDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        console.log('Deleting ticket with id:', id);
        return this.ticketService.remove(id);
    }
    
}
