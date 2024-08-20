import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({example: "7bda3df8-5a6f-473d-9f89-d59f88e8e2ba", description: "user id"})
    id: string
    @ApiProperty({example: "test@mail.ru", description: "user mail"})
    mail: string
}