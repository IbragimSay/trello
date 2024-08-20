import { CardService } from './card.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createCardDto } from './dto';
import { Request } from 'express';
import { jwtPayload } from 'src/interface';
import { JwtAuthGuard } from 'src/auth/guard';
import { IsCardOwnerGuard } from './guard';
import { IsColumnOwnerGuard } from 'src/column/guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardDto } from './dto/card.dto';

@ApiTags("card")
@Controller('card')
export class CardController {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly cardService:CardService
    ){}

    @ApiOperation({
        summary: "Получение карточки по id"
    })
    @ApiParam({
        name: "cardId",
        example: 1,
        description: "id карточки"
    })
    @Get(":cardId")
    @ApiResponse({
        status: 200,
        description: "Карточка получила успешна",
        type: CardDto
    })
    async getOne(@Param("cardId", ParseIntPipe) cardId:number){
        const card = await this.cardService.getOne(cardId)
        if(!card){
            throw new BadRequestException()
        }
        return card
    }

    @ApiOperation({
        summary: "Получение всех карточек по id  колонки"
    })
    @ApiParam({
        name: "columnId",
        example: 1,
        description: "id колонки"
    })
    @Get("column/:columnId")
    @ApiResponse({
        status: 200,
        description: "Все карточки по id колонки получены успешно",
        type: [CardDto]
    })
    async getAll(@Param("columnId", ParseIntPipe) columnId:number){
        return await this.cardService.getAll(columnId)
    }

    @ApiOperation({
        summary: "Создание карточки"
    })
    @ApiParam({
        name: "columnId",
        example: 1,
        description: "id колонки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Карточка создана успешно",
        type: CardDto
    })
    @UseGuards(JwtAuthGuard, IsColumnOwnerGuard)
    @Post("column/:columnId")
    async create(@Body() dto:createCardDto, @Param("columnId", ParseIntPipe) columnId:number, @Req() req:Request){
        const user = req.user as jwtPayload
        return await this.cardService.save(dto, user.id, columnId)
    }

    @ApiOperation({
        summary: "Обновление карточки"
    })
    @ApiParam({
        name: "cardId",
        example: 1,
        description: "id карточки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Карточка обновлена успешно",
        type: CardDto
    })
    @UseGuards(JwtAuthGuard, IsCardOwnerGuard)
    @Patch(":cardId")
    async updata(@Body() dto:createCardDto, @Param("cardId", ParseIntPipe) cardId:number, @Req() req:Request){
        return await this.cardService.updata(dto, cardId)
    }

    @ApiOperation({
        summary: "Удаление карточки"
    })
    @ApiParam({
        name: "cardId",
        example: 1,
        description: "id карточки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Карточка удалена успешно",
        type: CardDto
    })
    @UseGuards(JwtAuthGuard, IsCardOwnerGuard)
    @Delete(":cardId")
    async delete(@Param("cardId", ParseIntPipe) cardId:number){
        return await this.cardService.delete(cardId)
    }

}
