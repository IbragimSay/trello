import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule.forRoot({isGlobal:true}), ColumnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}