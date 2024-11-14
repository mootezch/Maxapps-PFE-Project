// src/personal/personal.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Controller('personals')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post('add')
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  @Get()
  findAll() {
    return this.personalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personalService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePersonalDto: UpdatePersonalDto) {
    return this.personalService.update(id, updatePersonalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personalService.remove(id);
  }
}
