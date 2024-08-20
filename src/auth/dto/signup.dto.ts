import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class signupDto {
    @ApiProperty({example: "test@mail.ru", description: "user mail"})
    @IsEmail()
    mail:string
    @ApiProperty({example: "test", description: "user password"})
    @IsString()
    @Matches(/^[a-zA-Zа-яА-Я0-9.]+$/)
    @MinLength(3)
    password:string
}