import { Injectable } from "@nestjs/common";
import { LoginService } from "./login.service";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { TokenDto } from "src/utils/commonDtos/token.dto";
import id from "zod/v4/locales/id.js";
import { boolean } from "zod";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JWTService
    ) {}

    async verifyUser(email: string, pass: PlainPassword): Promise<TokenDto | null> {
            const user = await this.loginService.logIn(email, pass);
            const accessToken = this.jwtService.generateAccesToken(user.id, email);
            const refreshToken = this.jwtService.generateRefreshToken(user.id, email);
            return{
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                emailVerifiedAt: user.emailVerifiedAt,
                phoneNumber1: user.phoneNumber1,
                phoneNumber2: user.phoneNumber2,
                failedAttempts: user.failedAttempts,
                isPasswordReset: user.isPasswordReset,
                isNotificationEnabled: user.isNotificationEnabled,
                lastFailedAttempt: user.lastFailedAttempt,
                lockedUntil: user.lockedUntil,
                status: user.status,
                isPatient: user.isPatient,
                isAdmin: user.isAdmin,
                isPrincipalInvestigator: user.isPrincipalInvestigator,
                isSuperUser: user.isSuperUser,
                accessToken,
                refreshToken
            };
    }
}