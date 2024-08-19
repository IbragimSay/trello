import { ColumnService } from './column.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createColumnDto, updataColumnDto } from './dto';
import { User } from 'src/auth/decorators';
import { Payload } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/guard';
import { jwtPayload } from 'src/interface';


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
    @Get("")
    getAll(@User() user:jwtPayload){
        return this.columnService.getAll(user.id)
    }

    @Get(":columnId")
    getOne(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.getOne(columnId)
    }

    @Delete(":columnId")
    delete(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.delete(columnId)
    }

    @Patch(":columnId")
    updata(@Body() dto:updataColumnDto, @Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.update(dto, columnId)
    }
}
