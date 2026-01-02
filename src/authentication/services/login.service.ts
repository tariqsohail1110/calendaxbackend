import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { UserNotFoundException } from "src/utils/exceptions/userNotFound.exception";
import { BadRequestException } from "src/utils/exceptions/common.exceptions";
import { PlainPassword } from "src/utils/value-objects/password.vo";
import { User } from "src/user/database/user.orm";

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async logIn(email: string, pass: PlainPassword): Promise<User> {
        try{
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new UserNotFoundException();
            }
            if (pass !== user.password){
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}