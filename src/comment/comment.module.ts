import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColumnService } from 'src/column/column.service';
import { CardService } from 'src/card/card.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [CommentService, PrismaService, ColumnService, CardService, UserService],
  controllers: [CommentController]
})
export class CommentModule {}
