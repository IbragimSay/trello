import { ColumnService } from 'src/column/column.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createCardDto, updataCardDto } from './dto';

@Injectable()
export class CardService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly columnService:ColumnService
    ){}

    async getOne(cardId:number){
        return await this.prismaService.cards.findFirst({
            where: {
                id: cardId
            }
        })
    }

    async getAll(columnId:number){
        const column = await this.columnService.getOne(columnId)
        if(!column){
            throw new BadRequestException()
        }
        return await this.prismaService.cards.findMany({
            where: {
                columnsId: columnId
            }
        })
    }

    async save(dto:createCardDto, userId:string, columnId: number){
        const column = this.columnService.getOne(columnId)
        if(!column){
            throw new BadRequestException()
        }
        return await this.prismaService.cards.create({
            data: {
                ...dto,
                columnsId: columnId,
                usersId: userId
            }
        })
    }

    async updata(dto:updataCardDto, cardId: number){
        const card = await this.getOne(cardId)
        if(!card){
            throw new BadRequestException()
        }
        return await this.prismaService.cards.update({
            where: {
                id: cardId
            },
            data: {
                ...dto,
            }
        })
    }

    async delete (cardId:number){
        const card = await this.getOne(cardId)
        if(!card){
            throw new BadRequestException()
        }
        return await this.prismaService.cards.delete({
            where: {
                id: cardId
            },
            select: {
                id: true
            }
        })
    }
}
