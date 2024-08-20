import { ApiProperty } from "@nestjs/swagger";

export class ColumnDto {
    @ApiProperty({example: 1, description: "id колонки"})
    id: number
    @ApiProperty({example: "text", description: "Текст колонки"})
    text: string
    @ApiProperty({example: "c6aa9e40-5568-4e59-8d74-ada8a35a01d2", description: "id пользователя"})
    userId: string
    @ApiProperty({example: 1, description: "Порядок"})
    order: number
}