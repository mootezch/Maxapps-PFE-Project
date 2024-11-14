// src/intervention/intervention.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update.intevention.dto';

@Controller('interventions')
export class InterventionController {
  constructor(private readonly interventionService: InterventionService) {}

  @Post('add')
  create(@Body() createInterventionDto: CreateInterventionDto) {
    return this.interventionService.create(createInterventionDto);
  }

  @Get()
  findAll() {
    return this.interventionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.interventionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateInterventionDto: UpdateInterventionDto) {
    return this.interventionService.update(id, updateInterventionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.interventionService.remove(id);
  }
}
