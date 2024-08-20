import { CardService } from './card.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createCardDto } from './dto';
import { Request } from 'express';
import { jwtPayload } from 'src/interface';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('card')
export class CardController {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly cardService:CardService
    ){}

    @Get(":cardId")
    async getOne(@Param("cardId", ParseIntPipe) cardId:number){
        const card = await this.cardService.getOne(cardId)
        if(!card){
            throw new BadRequestException()
        }
        return card
    }

    @Get("column/:columnId")
    async getAll(@Param("columnId", ParseIntPipe) columnId:number){
        return await this.cardService.getAll(columnId)
    }


    @UseGuards(JwtAuthGuard)
    @Post("column/:columnId")
    async create(@Body() dto:createCardDto, @Param("columnId", ParseIntPipe) columnId:number, @Req() req:Request){
        const user = req.user as jwtPayload
        return await this.cardService.save(dto, user.id, columnId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":cardId")
    async updata(@Body() dto:createCardDto, @Param("cardId", ParseIntPipe) cardId:number, @Req() req:Request){
        return await this.cardService.updata(dto, cardId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":cardId")
    async delete(@Param("cardId", ParseIntPipe) cardId:number){
        return await this.cardService.delete(cardId)
    }

}
