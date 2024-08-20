import { UserService } from 'src/user/user.service';
import { BadRequestException, ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserResponse } from './response/user-response';
import { Users } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(":userId")
    async getOne(@Param("userId") userId:string){
        const user:Users = await this.userService.getUserByIdOrMail(userId)
        if(!user){
            throw new BadRequestException()
        }
        return new UserResponse(user)
    }
}