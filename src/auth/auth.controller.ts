import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { signupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Post("signup")
    signup(@Body() dto:signupDto){
        return this.authService.signup(dto)
    }
}
