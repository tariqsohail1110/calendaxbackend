import { Injectable } from "@nestjs/common";
import { LoginService } from "./login.service";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { JWTService } from "src/utils/commonservices/jwt.service";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JWTService
    ) {}

    async verifyUser(email: string, pass: PlainPassword): Promise<any> {
            const user = await this.loginService.logIn(email, pass);
            const accessToken = this.jwtService.generateAccesToken(user.id, email);
            const refreshToken = this.jwtService.generateRefreshToken(user.id, email);
            return{
                data: user,
                accessToken,
                refreshToken
            };
    }
}