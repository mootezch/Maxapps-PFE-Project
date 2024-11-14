// src/intervention/intervention.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update.intevention.dto';

@Injectable()
export class InterventionService {
    constructor(
        @InjectRepository(Intervention)
        private interventionRepository: Repository<Intervention>,
    ) {}

    async create(createInterventionDto: CreateInterventionDto): Promise<Intervention> {
        const intervention = this.interventionRepository.create(createInterventionDto);
        return await this.interventionRepository.save(intervention);
    }

    async findAll(): Promise<Intervention[]> {
        return await this.interventionRepository.find({ relations: ['personal', 'ticket'] });
    }

    async findOne(id: number): Promise<Intervention | undefined> {
        return await this.interventionRepository.findOne({
            where: { idIntervention: id },
            relations: ['personal', 'ticket']
        });
    }

    async update(id: number, updateInterventionDto: UpdateInterventionDto): Promise<Intervention> {
        await this.interventionRepository.update(id, updateInterventionDto);
        return await this.interventionRepository.findOne({
            where: { idIntervention: id },
            relations: ['personal', 'ticket']
        });
    }

    async remove(id: number): Promise<void> {
        await this.interventionRepository.delete(id);
    }
}
