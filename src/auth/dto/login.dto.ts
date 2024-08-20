import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class loginDto {
    @ApiProperty({example: "test@mail.ru", description: "Почта пользователя"})
    @IsEmail()
    mail:string
    @ApiProperty({example: "test", description: "Пароль пользователя"})
    @IsString()
    @Matches(/^[a-zA-Zа-яА-Я0-9.]+$/)
    @MinLength(3)
    password:string
}