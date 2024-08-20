import { ColumnService } from './column.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ColumnDto, createColumnDto, updataColumnDto } from './dto';
import { User } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guard';
import { jwtPayload } from 'src/interface';
import { IsColumnOwnerGuard } from './guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("column")
@Controller('column')
export class ColumnController {
    constructor(
        private readonly columnService:ColumnService
    ){}

    @ApiOperation({
        summary: "Получение колонки по id"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 201,
        description: 'ok',
        type: ColumnDto
    })
    @UseGuards(JwtAuthGuard)
    @Post("")
    async save(@Body() dto:createColumnDto, @User() user:jwtPayload){
        return this.columnService.save(dto, user.id)
    }

    @ApiOperation({
        summary: "Получение  всех колонок по id пользователя"
    })
    @ApiParam({
        name: "userId",
        example: 1,
        description: "id пользователя"
    })
    @ApiResponse({
        status: 201,
        description: "ok",
        type: [ColumnDto]

    })
    @UseGuards(JwtAuthGuard)
    @Get("user/:userId")
    getAll(@Param("userId") userId:string){
        return this.columnService.getAll(userId)
    }

    @ApiOperation({
        summary: "Создание колонки"
    })
    @ApiParam({
        name: "columnId",
        example: 1,
        description: "id колонки"
    })
    @ApiResponse({
        status: 201,
        description: "ok",
        type: ColumnDto

    })
    @Get(":columnId")
    getOne(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.getOne(columnId)
    }

    @ApiOperation({
        summary: "Обновление колонки"
    })
    @ApiParam({
        name: "columnId",
        example: 1,
        description: "id колонки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 201,
        description: "ok",
        type: ColumnDto

    })
    @UseGuards(JwtAuthGuard, IsColumnOwnerGuard)
    @Patch(":columnId")
    updata(@Body() dto:updataColumnDto, @Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.update(dto, columnId)
    }

    @ApiOperation({
        summary: "Удаление колонки"
    })
    @ApiParam({
        name: "columnId",
        example: 1,
        description: "id колонки"
    })
    @ApiBearerAuth("Authorization")
    @ApiResponse({
        status: 201,
        description: "ok",
        type: ColumnDto

    })
    @UseGuards(JwtAuthGuard, IsColumnOwnerGuard)
    @Delete(":columnId")
    delete(@Param("columnId", ParseIntPipe) columnId:number){
        return this.columnService.delete(columnId)
    }


}
