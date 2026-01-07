import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Email } from "src/utils/value-objects/email.vo";
import { OtpPurpose } from "../database/otp.entity";

export class OtpDto {
    @IsNotEmpty()
    @IsEmail()
    email: Email;


    @IsNotEmpty()
    @IsString()
    purpose: OtpPurpose
}