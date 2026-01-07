import { Email } from "src/utils/value-objects/email.vo";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OtpPurpose {
    GENERAL = 'general',
    VERIFICATION = 'verification',
    RESET_PASSWORD = 'reset_password',
}

export enum OtpStatus {
    PENDING = 'pending',
    VERIFIED = 'verified',
    EXPIRED = 'expired',
    CANCELLED = 'cancelled',
}

@Entity('otp')
export class OTP {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    code: string;

    @Column(
        {
            type: 'enum',
            enum: OtpPurpose
        }
    )
    purpose: OtpPurpose;


    @Column(
        {
            type: 'enum',
            enum: OtpStatus,
            default: OtpStatus.PENDING,
        }
    )
    status: OtpStatus;


    @Column()
    email: Email;


    @Column()
    createdAt: Date


    @Column()
    expiredAt: Date


    // @Column()
    // deletedAt: Date
}