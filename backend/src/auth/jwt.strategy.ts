import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable() // provider
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, //TODO: store in env, same as other
    }); // config
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userService.findOne(payload.sub);
    if (user) {
      const { password, cust_id, createdAt, updatedAt, ...rest } = user;
      return rest;
    }
    return null;
    // will become available in req.user
  }
}
