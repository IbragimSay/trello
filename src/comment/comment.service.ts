import { CardService } from './../card/card.service';
import { createCardDto } from 'src/card/dto';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly cardService:CardService
    ){}

    async getOne(commentId:number){
        return await this.prismaService.comments.findFirst({
            where: {
                id: commentId
            }
        })
    }
    async getAll(cardId:number){
        return await this.prismaService.comments.findMany({
            where: {
                cardsId:cardId
            }
        })
    }

    async save(dto:createCardDto, userId:string, cardId:number){
        const card = await this.cardService.getOne(cardId)
        if(!card){
            throw new BadRequestException()
        }
        return await this.prismaService.comments.create({
            data: {
                ...dto,
                usersId: userId,
                cardsId: cardId
            }
        })
    }

    async updata(dto:createCardDto, commentId:number){
        const comment = await this.getOne(commentId)
        if(!comment){
            throw new BadRequestException()
        }
        return await this.prismaService.comments.update({
            where:{
                id: commentId
            },
            data: {
                ...dto
            }
        })
    }

    async delete(commentId:number){
        const comment = await this.getOne(commentId)
        if(!comment){
            throw new BadRequestException()
        }
        return await this.prismaService.comments.delete({
            where: {
                id: commentId
            },
            select: {
                id:true
            }
        })
    }
}
