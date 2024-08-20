import { User } from 'src/auth/decorators/get-user.decorator';
import { UserService } from 'src/user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createColumnDto, updataColumnDto } from './dto';


@Injectable()
export class ColumnService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly userService:UserService
        
    ){}

    async getAll(userId:string){
        const user = await this.userService.getUserByIdOrMail(userId)
        return await this.prismaService.columns.findMany({
            where:{
                usersId: user.id
            }
        })
    }

    async save(dto:createColumnDto, userId:string){
        return await this.prismaService.columns.create({
            data: {
                ...dto,
                usersId: userId
            }
        })
    }
    
    async delete(id:number){
        const column = await this.getOne(id)
        if(!column){
            throw new BadRequestException()
        }
        return await this.prismaService.columns.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }

    async update(dto:updataColumnDto, id:number){
        const column = await this.getOne(id)
        if(!column){
            throw new BadRequestException()
        }
        return await this.prismaService.columns.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

    async getOne(id:number){
        const column = await this.prismaService.columns.findFirst({
            where: {
                id
            }
        })
        if(!column){
            throw new BadRequestException()
        }
        return column
    }
}
