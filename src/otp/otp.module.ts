import { Module } from "@nestjs/common";
import { OtpController } from "./controllers/otp.controller";
import { OtpRepository } from "./repositories/otp.repository";
import { OtpService } from "./services/otp.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OTP } from "./database/otp.entity";

const Controllers = [OtpController]
const Services = [OtpService]
const Repositories = [OtpRepository]

@Module({
    imports: [
        TypeOrmModule.forFeature([OTP]),
    ],
    controllers: Controllers,
    providers: [...Services, ...Repositories]
})

export class OtpModule {}