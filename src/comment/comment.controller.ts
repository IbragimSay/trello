import { CommentService } from './comment.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
import { jwtPayload } from 'src/interface';
import { updataCommentDto } from './dto/updata-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard';
import { IsCommentOwner } from './guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { commentDto } from './dto';

@ApiTags("comment")
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){}

    @ApiOperation({
        summary: "Получение комментария  по id"
    })
    @ApiParam({
        name: "commentId",
        example: 1,
        description: "id комментария"
    })
    @ApiResponse({
        status: 200,
        description: "Комментарий получил успешно",
        type: commentDto
    })
    @Get(":commentId")
    async getOne(@Param("commentId", ParseIntPipe) commentId:number){
        const comment = await this.commentService.getOne(commentId)
        if(!comment){
            throw new BadRequestException()
        }
        return comment
    }


    @ApiOperation({
        summary: "Получение всех комментариев по id карточки"
    })
    @ApiParam({
        name: "cardId",
        example: 1,
        description: "id карточки"
    })
    @ApiResponse({
        status: 200,
        description: "Все комментарии по id карточки получены успешно",
        type: [commentDto]
    })
    @Get("card/:cardId")
    async getAll(@Param("cardId", ParseIntPipe) cardId:number){
        return await this.commentService.getAll(cardId)
    }

    @ApiOperation({
        summary: "Создание комментария"
    })
    @ApiParam({
        name: "cardId",
        example: 1,
        description: "id карточки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Комментарий создан успешно",
        type: commentDto
    })
    @UseGuards(JwtAuthGuard)
    @Post("card/:cardId")
    async create(@Param("cardId", ParseIntPipe) cardId:number, @Body() dto:createCommentDto, @Req() req:Request){
        const user = req.user as jwtPayload
        return await this.commentService.save(dto, user.id, cardId)
    }

    @ApiOperation({
        summary: "Обновление комментария"
    })
    @ApiParam({
        name: "commentId",
        example: 1,
        description: "id комментария"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Комментарий обновлен успешно",
        type: commentDto
    })
    @UseGuards(JwtAuthGuard, IsCommentOwner)
    @Patch(":commentId")
    async updata(@Param("commentId", ParseIntPipe) commentId:number, @Body() dto: updataCommentDto){
        return await this.commentService.updata(dto, commentId)
    }

    @ApiOperation({
        summary: "Удаление комментария"
    })
    @ApiParam({
        name: "commentId",
        example: 1,
        description: "id комментария"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 200,
        description: "Комментарий удален успешно",
        type: commentDto
    })
    @UseGuards(JwtAuthGuard, IsCommentOwner)
    @Delete(":commentId")
    async delete(@Param("commentId", ParseIntPipe) commentId:number){
        return await this.commentService.delete(commentId)
    }
}
