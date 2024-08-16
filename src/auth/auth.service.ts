import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { signupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly userService:UserService
    ){}

    signup(dto:signupDto){
        return this.userService.save(dto)
    }

}
