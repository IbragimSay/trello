import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { Users } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}

    signup(dto:signupDto){
        return this.userService.save(dto)
    }

    async login(dto:loginDto){
        const user:Users = await this.userService.getUserByIdOrMail(dto.mail)
        if(!user){
            throw new UnauthorizedException()
        }
        const validPassword = compareSync(dto.password, user.password)
        if(!validPassword){
            throw new UnauthorizedException()
        }
        const accessToken = await this.jwtService.signAsync({id:user.id, mail:user.mail})
        return {accessToken}
    }  
}
