import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserRoles } from './user-roles.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
    );

    console.log({user})
    if (!user) {
      throw new UnauthorizedException();
    }

    const userRoleValues = Object.values(UserRoles);
    if (!userRoleValues.includes(user.role)) {
      throw new UnauthorizedException('Invalid user role');
    }

    return user;
  }
}
