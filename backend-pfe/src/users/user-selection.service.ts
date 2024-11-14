// src/users/user-selection.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity'; // Adjust the path as necessary

@Injectable()
export class UserSelectionService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

   // Fetch users not linked to any clients
async findUsersForClient(): Promise<User[]> {
    return this.userRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.client", "client")
        .where("client.id IS NULL")
        .getMany();
}

// Fetch users not linked to any personals
async findUsersForPersonal(): Promise<User[]> {
    return this.userRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.personal", "personal")
        .where("personal.id IS NULL")
        .getMany();
}
}
