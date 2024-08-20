import { ApiProperty } from "@nestjs/swagger"

export class updataColumnDto {
    @ApiProperty({example: "updata text", description: "Текст колонки"})
    text:string
    @ApiProperty({example: 2, description: "Порядок"})
    order: number
}