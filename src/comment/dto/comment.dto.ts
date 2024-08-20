import { ApiProperty } from "@nestjs/swagger"

export class commentDto {
    @ApiProperty({example: 1, default: "id комментария"})
    id: number
    @ApiProperty({example: "text", default: "Текст комментария"})
    text: string
    @ApiProperty({example: 1, default: "id карточки к которому она привязана"})
    cardId: number
    @ApiProperty({example: 1, default: "Порядок"})
    order:number
    @ApiProperty({example: "c6aa9e40-5568-4e59-8d74-ada8a35a01d2", default: "id пользователя"})
    usersId: string
    
}