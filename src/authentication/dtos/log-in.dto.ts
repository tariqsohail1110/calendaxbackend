import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class logInDto {
    @ApiProperty({
        description: "User's email",
        example: "user@example.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        description: "User's Password",
        example: "Password123"
    })
    @IsString()
    @IsNotEmpty()
    password: string;  
}