import { IsEmail, IsString, Matches, MinLength } from "class-validator"

export class loginDto {
    @IsEmail()
    mail:string
    @IsString()
    @Matches(/^[a-zA-Zа-яА-Я0-9.]+$/)
    @MinLength(3)
    password:string
}