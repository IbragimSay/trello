import { ApiProperty } from "@nestjs/swagger"

export class updataCardDto {
    @ApiProperty({example: "text", description: "Текст для карточки"})
    text: string
    @ApiProperty({example: 1, description: "Порядок"})
    order: number
}