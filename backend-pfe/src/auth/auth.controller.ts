// src/auth/auth.controller.ts
import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RolesGuard } from './guard/roles.guard'
import { HasRoles } from './guard/has-roles.decorator'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { UserRoles } from './guard/user-roles.enum'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.body

    console.log(req.body)
    return this.authService.login({ email, password })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRoles.Personel, UserRoles.Client) // Allow both roles
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user
  }

 
}
