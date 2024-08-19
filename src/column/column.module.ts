import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, PrismaService]
})
export class ColumnModule {}
