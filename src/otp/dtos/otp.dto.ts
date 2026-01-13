import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Email } from "src/utils/value-objects/email.vo";
import { OtpPurpose } from "../database/otp.entity";
import { ApiProperty } from "@nestjs/swagger";

export class OtpDto {
    @ApiProperty({
        name: 'email',
        example: 'user@mail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: Email;


    // @IsNotEmpty()
    // @IsString()
    // purpose: OtpPurpose
}