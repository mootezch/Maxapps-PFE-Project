// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/users.entity'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from 'src/projet/projet.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)

    console.log({ user })

    if (user) {
      let check = await bcrypt.compare(pass, user.password)

      if (!user.status) {
        return null
      }

      if (check) {
        return user
      }
      return null
    }
    return null
  }

  async login(credentials: { email: string; password: string }) {
    console.log(credentials)
    const { email, password } = credentials
    const user = await this.validateUser(email, password)
    if (user) {
      const payload = {
        email: user.email,
        role: user.role,
        id: user.idUser,
        idClient: user?.client?.idClient,
        client: user?.client
      }

      delete user['password']
      return {
        ...(user?.personals?.length > 0 ? { user: user?.personals[0] } : {}),
        access_token: this.jwtService.sign(payload)
      }
    }

    if (!user) {
      throw new UnauthorizedException()
    }

    // return {error  : true , message  : "error login"};
  }
}
