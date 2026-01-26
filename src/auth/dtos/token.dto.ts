// import { IsNotEmpty, IsString } from "class-validator";
// import { UserResponseDto } from "src/user/dtos/user-response.dto";

// export class TokenDto extends UserResponseDto{
//     @IsString()
//     @IsNotEmpty()
//     accessToken: string;

//     @IsString()
//     @IsNotEmpty()
//     refreshToken: string;
// }
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokenDto {
    @Expose() id: string;
    @Expose() firstName: string;
    @Expose() middleName?: string;
    @Expose() lastName: string;
    @Expose() email: string;
    @Expose() emailVerifiedAt?: Date;
    @Expose() phoneNumber1?: string;
    @Expose() phoneNumber2?: string;
    @Expose() failedAttempts: number;
    @Expose() isPasswordReset: boolean;
    @Expose() isNotificationEnabled: boolean;
    @Expose() lastFailedAttempt?: Date;
    @Expose() lockedUntil?: Date;
    @Expose() status: string;
    @Expose() isPatient: boolean;
    @Expose() isAdmin: boolean;
    @Expose() isPrincipalInvestigator: boolean;
    @Expose() isSuperUser: boolean;
    @Expose() accessToken: string;
    @Expose() refreshToken: string;
}