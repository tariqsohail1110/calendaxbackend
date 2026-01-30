import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OtpService } from "../services/otp.service";
import { skipAuth } from "src/utils/decorators/skip-auth.decorator";
import { SendOtpDto } from "../dtos/otp-response.dto";
import { UserRepository } from "src/user/repositories/user.repository";
import { VerifyOtpDto } from "../dtos/verify-otp.dto";

@Controller('v1/Otp')
@ApiTags('Otp')
export class OtpController {
    constructor(
        private readonly otpService: OtpService,
        private readonly userRepository: UserRepository,
    ) {}


    @skipAuth()
    @Post('/sendOtp')
    async send(@Body() sendOtpDto: SendOtpDto) {
        const user = await this.userRepository.getByEmail(sendOtpDto.email);

        if(!user){
            throw new BadRequestException('User Not Found');
        }

        await this.otpService.sendOtp(
            user.id,
            user.email,
            user.firstName,
            sendOtpDto.purpose,
        );

        return {
            success: true,
            message: 'Otp sent successfully'
        };
    };
    

    @skipAuth()
    @Post('verifyOtp')
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        const user = await this.userRepository.getByEmail(verifyOtpDto.email);

        if(!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isValid = await this.otpService.verifyAndConsume(
            user.id,
            verifyOtpDto.code,
            verifyOtpDto.purpose,
        );

        return {
            success: true,
            message: 'Otp verified successfully'
        };
    };
}