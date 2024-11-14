// src/intervention/intervention.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionService } from './intervention.service';
import { InterventionController } from './intervention.controller';
import { Intervention } from './intervention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intervention])],
  providers: [InterventionService],
  controllers: [InterventionController],
})
export class InterventionModule {}
