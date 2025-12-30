import { Body, Controller, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginService } from "../services/login.service";
import { logInDto } from "../dtos/log-in.dto";

@Controller("v1/auth")
@ApiTags("Authentication")
export class AuthenticationController {
    constructor(private readonly loginService: LoginService) {}

    @Post("/login")
    @HttpCode(200)
    logIn(@Body() logInDto: logInDto) {
        return this.loginService.logIn(logInDto.email, logInDto.password);
    }
}
