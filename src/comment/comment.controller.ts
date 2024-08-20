import { CommentService } from './comment.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
import { jwtPayload } from 'src/interface';
import { updataCommentDto } from './dto/updata-comment.dto';
import { JwtAuthGuard } from 'src/auth/guard';
import { IsCommentOwner } from './guard';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){}

    @Get(":commentId")
    async getOne(@Param("commentId", ParseIntPipe) commentId:number){
        const comment = await this.commentService.getOne(commentId)
        if(!comment){
            throw new BadRequestException()
        }
        return comment
    }

    @Get("card/:cardId")
    async getAll(@Param("cardId", ParseIntPipe) cardId:number){
        return await this.commentService.getAll(cardId)
    }

    @UseGuards(JwtAuthGuard)
    @Post("card/:cardId")
    async create(@Param("cardId", ParseIntPipe) cardId:number, @Body() dto:createCommentDto, @Req() req:Request){
        const user = req.user as jwtPayload
        return await this.commentService.save(dto, user.id, cardId)
    }

    @UseGuards(JwtAuthGuard, IsCommentOwner)
    @Patch(":commentId")
    async updata(@Param("commentId", ParseIntPipe) commentId:number, @Body() dto: updataCommentDto){
        return await this.commentService.updata(dto, commentId)
    }

    @UseGuards(JwtAuthGuard, IsCommentOwner)
    @Delete(":commentId")
    async delete(@Param("commentId", ParseIntPipe) commentId:number){
        return await this.commentService.delete(commentId)
    }
}
