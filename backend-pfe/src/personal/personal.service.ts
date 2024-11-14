// src/personal/personal.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personal } from './personal.entity';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';

@Injectable()
export class PersonalService {
    constructor(
        @InjectRepository(Personal)
        private personalRepository: Repository<Personal>,
    ) {}

    async create(createPersonalDto: CreatePersonalDto): Promise<Personal> {
        const personal = this.personalRepository.create(createPersonalDto);
        return await this.personalRepository.save(personal);
    }

    async findAll(): Promise<Personal[]> {
        return await this.personalRepository.find({ relations: ['user', 'interventions'] });
    }

    async findOne(id: number): Promise<Personal | undefined> {
        return await this.personalRepository.findOne({
            where: { idPersonal: id },
            relations: ['user', 'interventions']
        });
    }

    async update(id: number, updatePersonalDto: UpdatePersonalDto): Promise<Personal> {
        await this.personalRepository.update(id, updatePersonalDto);
        return await this.personalRepository.findOne({
            where: { idPersonal: id },
            relations: ['user', 'interventions']
        });
    }

    async remove(id: number): Promise<void> {
        await this.personalRepository.delete(id);
    }
}
