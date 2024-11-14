// src/client/client.controller.ts

import { Body, Controller, Delete, Get, Request, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guard/roles.guard'
import { UserRoles } from 'src/auth/guard/user-roles.enum'
import { HasRoles } from 'src/auth/guard/has-roles.decorator'

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('add')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRoles.Client) // Allow both roles
  @Get('/myprojects')
  myProjects(@Request() req) {
    return this.clientService.myProjects(req.user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRoles.Client) // Allow both roles
  @Get('/myprojects/:id')
  myProjectById(@Request() req, @Param('id') id: number) {
    return this.clientService.myProjectById(req.user, id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRoles.Client) // Allow both roles
  @Post('/myprojects/:id/add-ticket')
  addTicket(@Request() req, @Param('id') id: number, @Body() body: any) {
    return this.clientService.addTicket(req.user, id, body)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRoles.Client) // Allow both roles
  @Get('/myticket/:id/messages')
  myTicketMessages(@Request() req, @Param('id') id: number) {
    return this.clientService.myTicketMessages(req.user, id)
  }

  @Get('')
  findAll() {
    return this.clientService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(id)
  }
}
