import { Body, Controller, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { logInDto } from "../dtos/log-in.dto";
import { AuthenticationService } from "../services/authentication.service";

@Controller("v1/auth")
@ApiTags("Authentication")
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post("/login")
    @HttpCode(200)
    logIn(@Body() logInDto: logInDto) {
        return this.authenticationService.verifyUser(logInDto.email, logInDto.password);
    }
}
