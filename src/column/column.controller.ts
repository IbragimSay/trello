import { ColumnService } from './column.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createColumnDto, updataColumnDto } from './dto';
import { User } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guard';
import { jwtPayload } from 'src/interface';
import { IsColumnOwnerGuard } from './guard';


@Controller('column')
export class ColumnController {
    constructor(
        private readonly columnService:ColumnService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post("")
    async save(@Body() dto:createColumnDto, @User() user:jwtPayload){
        return this.columnService.save(dto, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("user/:userId")
    getAll(@Param("userId") userId:string){
        return this.columnService.getAll(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":columnId")
    getOne(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.getOne(columnId)
    }

    @UseGuards(JwtAuthGuard, IsColumnOwnerGuard)
    @Delete(":columnId")
    delete(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.delete(columnId)
    }

    @UseGuards(JwtAuthGuard, IsColumnOwnerGuard)
    @Patch(":columnId")
    updata(@Body() dto:updataColumnDto, @Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.update(dto, columnId)
    }
}
