import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OTP, OtpPurpose, OtpStatus } from "../database/otp.entity";
import { Email } from "src/utils/value-objects/email.vo";
import { User } from "src/user/database/user.orm";

@Injectable()
export class OtpRepository {
    constructor(
        @InjectRepository(OTP) private readonly otpRepository: Repository<OTP>
    ) {}

    async createOtp(payload: {
        email: Email;
        code: string;
        purpose: OtpPurpose;
        createdAt: Date;
        expiredAt: Date;
    }): Promise<OTP> {
        const otp = this.otpRepository.create({
            ...payload,
            status: OtpStatus.PENDING,
        });

        return this.otpRepository.save(otp);
    };
}