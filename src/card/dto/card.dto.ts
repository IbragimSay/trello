import { ApiProperty } from "@nestjs/swagger";

export class CardDto {
    @ApiProperty({example: 1, description: "id карточки"})
    id:number
    @ApiProperty({example: "text", description: "Текст для карточки"})
    text: string
    @ApiProperty({example: 1, description: "id колонки"})
    columnsId:number
    @ApiProperty({example: 1, description: "Порядок"})
    order:number
    @ApiProperty({example: "c6aa9e40-5568-4e59-8d74-ada8a35a01d2", description: "id пользователя"})
    usersId:string
}