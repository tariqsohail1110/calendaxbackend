import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { TokenDto } from "src/auth/dtos/token.dto";
import { UserNotFoundException } from "src/utils/exceptions/userNotFound.exception";
import { User } from "src/user/database/user.orm";
import { UserService } from "src/user/services/user.service";
import * as bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
import tr from "zod/v4/locales/tr.js";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly jwtService: JWTService,
        private readonly userService: UserService
    ) {}


    async logIn(email: string, pass: PlainPassword): Promise<User> {
        try{
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new UserNotFoundException();
            }
            const isMatch = await bcrypt.compare(pass, user.password);
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
            const [accessToken, refreshToken] = await Promise.all([this.jwtService.generateAccesToken(user.id, email),
                this.jwtService.generateRefreshToken(user.id, email)]);
            const { password, passwordExpiresAt, deletedAt, createdAt, updatedAt,  ...userDto } = user; 

            return plainToClass(TokenDto, {
                ...userDto,
                accessToken,
                refreshToken
            },{ excludeExtraneousValues: true });
    }


    async generateNewAccessToken (refreshToken: string) {
        return await this.jwtService.refresh(refreshToken);
    }
}