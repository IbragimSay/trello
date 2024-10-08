import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnModule } from './column/column.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule.forRoot({isGlobal:true}), ColumnModule, CardModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}