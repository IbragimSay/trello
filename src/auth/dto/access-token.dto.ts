import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxZmNhNDViLWI4OGEtNDNlMC1iZWFiLTYzZDUwNWE5YTZkOSIsIm1haWwiOiJ0ZXN0MjQ3c3Myc0BnbWFpbC5jb20iLCJpYXQiOjE3MjQxNjM0MzIsImV4cCI6MTcyNDE2NzAzMn0.g-YJ3XUzGUTm9Jajl_L3YaSfHyEyrVz76tWBwlaUfQA", description: "access token"})
    accessToken:  string
}