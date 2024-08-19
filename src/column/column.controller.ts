import { ColumnService } from './column.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { createColumnDto } from './dto';

@Controller('column')
export class ColumnController {
    constructor(
        private readonly columnService:ColumnService
    ){}

    @Post("")
    async save(@Body() dto:createColumnDto){

    }
}
