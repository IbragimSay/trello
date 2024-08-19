import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createColumnDto, updataColumnDto } from './dto';


@Injectable()
export class ColumnService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async getAll(userId:string){
        return await this.prismaService.columns.findMany({
            where:{
                usersId:userId
            }
        })
    }

    async save(dto:createColumnDto, userId:string){
        return await this.prismaService.columns.create({
            data: {
                text: dto.text,
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
                text:dto.text,
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
