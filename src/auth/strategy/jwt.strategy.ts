import { UserService } from 'src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from 'src/interface';
import { Users } from '@prisma/client';

@Injectable()       
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name)
  constructor(
    private readonly configService:ConfigService,
    private readonly userService:UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: jwtPayload) {
    const user:Users = await this.userService.getUserByIdOrMail(payload.id).catch(e=>{
        this.logger.error(e)
        throw new UnauthorizedException()
    })
    if(!user){
        throw new UnauthorizedException()
    }
    return payload

  }
}