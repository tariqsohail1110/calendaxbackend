import { Injectable } from "@nestjs/common";
import { LoginService } from "./login.service";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { TokenDto } from "src/utils/commonDtos/token.dto";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { string } from "zod";

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
                accessToken,
                refreshToken
            };
    }
}