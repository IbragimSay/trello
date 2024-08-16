import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async save(dto:createUserDto){
        const user = await this.getUserByIdOrMail(dto.mail)
        if(user){
            throw new BadRequestException()
        }
        return this.prismaService.users.create({
            data: dto
        })
    }

    async getUserByIdOrMail(idOrMail:string){
        return await this.prismaService.users.findFirst({
            where:{
                OR: [
                    {id:idOrMail},
                    {mail:idOrMail}
                ]
            }
        })
    }
}
