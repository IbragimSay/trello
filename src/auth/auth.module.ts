import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { options } from './options/jwt-options';
import { JwtAuthGuard } from './guard';
import { JwtStrategy } from './strategy';

@Module({
  providers: [AuthService, PrismaService, UserService],
  controllers: [AuthController],
  imports: [JwtModule.registerAsync(options())]
})
export class AuthModule {}
