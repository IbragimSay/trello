import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ColumnService } from 'src/column/column.service';

@Module({
  providers: [CardService, PrismaService, UserService, ColumnService],
  controllers: [CardController]
})
export class CardModule {}
