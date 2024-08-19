import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { JwtStrategy } from 'src/auth/strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, JwtAuthGuard, JwtStrategy, PrismaService, UserService]
})
export class ColumnModule {}
