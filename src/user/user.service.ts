import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDto } from './dto';
import { hashSync } from 'bcrypt';

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
        const hashPassword = hashSync(dto.password, 5)
        return this.prismaService.users.create({
            data: {
                mail: dto.mail,
                password: hashPassword
            }
        })
    }

    async getUserByIdOrMail(idOrMail:string){
        const user =  await this.prismaService.users.findFirst({
            where:{
                OR: [
                    {id:idOrMail},
                    {mail:idOrMail}
                ]
            }
        })
        if(!user){
            throw new BadRequestException()
        }
        return user
    }
}
