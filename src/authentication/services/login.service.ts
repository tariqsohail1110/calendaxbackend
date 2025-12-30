import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { User } from "src/user/database/user.orm";
import { UserNotFoundException } from "src/utils/exceptions/userNotFound.exception";
import { BadRequestException } from "src/utils/exceptions/common.exceptions";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async logIn(email: string, pass: string): Promise<{access_token: string}> {
        try{
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new UserNotFoundException();
            }
            if (pass !== user.password){
                throw new UnauthorizedException();
            }
            const payload = { sub: user.password, username: user.firstName};
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}