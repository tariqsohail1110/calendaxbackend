import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OtpDto } from "../dtos/otp.dto";
import { OtpService } from "../services/otp.service";
import { skipAuth } from "src/utils/decorators/skip-auth.decorator";

@Controller('v1/Otp')
@ApiTags('Otp')
export class OtpController {
    constructor(
        private readonly otpService: OtpService
    ) {}


    @skipAuth()
    @Post('/generateOtp')
    generate(@Body() otpDto: OtpDto) {
        return this.otpService.generateOtp(otpDto.email, otpDto.purpose)
    }
}