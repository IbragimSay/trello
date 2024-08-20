import { ApiProperty } from "@nestjs/swagger"

export class createColumnDto{
    @ApiProperty({example: "text", description: "Текст колонки"})
    text:string
    @ApiProperty({example: 1, description: "Порядок"})
    order: number
}