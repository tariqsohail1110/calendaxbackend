import { Module } from "@nestjs/common";
import { OtpController } from "./controllers/otp.controller";
import { OtpRepository } from "./repositories/otp.repository";
import { OtpService } from "./services/otp.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OTP } from "./database/otp.entity";
import { ConfigModule} from "@nestjs/config";
import { EmailService } from "src/utils/commonservices/email.service";
import { UserModule } from "src/user/user.module";

const Controllers = [OtpController]
const Services = [OtpService, EmailService]
const Repositories = [OtpRepository]

@Module({
    imports: [
        TypeOrmModule.forFeature([OTP]),
        UserModule,
        ConfigModule,
    ],
    controllers: Controllers,
    providers: [...Services, ...Repositories]
})

export class OtpModule {}