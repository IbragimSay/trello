import { AuthService } from './auth.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Post,Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import { AccessTokenDto, loginDto, signupDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { UserResponse } from 'src/user/response/user-response';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    
    @ApiOperation({
        summary: "Регистрация пользователя"
    })
    @ApiResponse({
        status: 201,
        description: "Пользователь успешно зарегистрирован",
        type: UserDto
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post("signup")
    async signup(@Body() dto:signupDto){
        const user = await this.authService.signup(dto)
        return new UserResponse(user)
    }

    @ApiOperation({
        summary: "Получение jwt access токина"
    })
    @ApiResponse({
        status: 201,
        description: "Токен успешно получен",
        type: AccessTokenDto
    })
    @Post("login")
    login(@Body() dto:loginDto){
        return this.authService.login(dto)
    }
}
