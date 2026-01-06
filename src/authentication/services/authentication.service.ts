import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { TokenDto } from "src/utils/commonDtos/token.dto";
import { UserNotFoundException } from "src/utils/exceptions/userNotFound.exception";
import { User } from "src/user/database/user.orm";
import { UserService } from "src/user/services/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly jwtService: JWTService,
        private readonly userService: UserService,
    ) {}


    async logIn(email: string, pass: PlainPassword): Promise<User> {
        try{
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new UserNotFoundException();
            }
            const isMatch = await bcrypt.compare(pass, user.password);
            console.log(isMatch);
            if (!isMatch){
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async verifyUser(email: string, pass: PlainPassword): Promise<TokenDto | null> {
            const user = await this.logIn(email, pass);
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


    async generateNewAccessToken (refreshToken: string) {
        return await this.jwtService.refresh(refreshToken);
    }
}