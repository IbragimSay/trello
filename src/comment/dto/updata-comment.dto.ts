import { ApiProperty } from "@nestjs/swagger"

export class updataCommentDto {
    @ApiProperty({example: "text", description: "Текст комментария"})
    text: string
    @ApiProperty({example: 2, description: "Порядок"})
    order: number
}