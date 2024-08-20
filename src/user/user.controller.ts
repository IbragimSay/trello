import { UserService } from 'src/user/user.service';
import { BadRequestException, ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserResponse } from './response/user-response';
import { Users } from '@prisma/client';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags("user")
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @ApiOperation({
        summary: "Получение пользователя по id"
    })
    @ApiParam({
        name: "userId",
        example: "7bda3df8-5a6f-473d-9f89-d59f88e8e2ba",
        description: "id пользователя"
    })
    @ApiResponse({
        status: 201,
        description: "ok",
        type: UserDto
    })
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