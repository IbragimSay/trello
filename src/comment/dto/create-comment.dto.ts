import { ApiProperty } from "@nestjs/swagger"

export class createCommentDto {
    @ApiProperty({example: "text", description: "Текст комментария"})
    text: string
    @ApiProperty({example: 1, description: "Порядок"})
    order: number
}