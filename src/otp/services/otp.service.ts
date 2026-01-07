import { Injectable } from "@nestjs/common";
import { OtpRepository } from "../repositories/otp.repository";
import { OtpPurpose } from "../database/otp.entity";
import { Email } from "src/utils/value-objects/email.vo";
import * as bcrypt from 'bcrypt';

@Injectable()
export class OtpService {
    constructor( 
        private readonly otpRepository: OtpRepository
    ) {}

    async generateOtp(email: Email, purpose: OtpPurpose) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        return this.otpRepository.createOtp({
            email,
            purpose,
            code,
            createdAt: new Date,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        });
    }
}