import { Body, Controller, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { logInDto } from "../dtos/log-in.dto";
import { AuthenticationService } from "../services/authentication.service";
import { skipAuth } from "src/utils/decorators/skip-auth.decorator";
import { RefreshTokenDto } from "src/utils/commonDtos/refresh-token.dto";

@Controller("v1/auth")
@ApiTags("Authentication")
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @skipAuth()
    @Post("/login")
    @HttpCode(200)
    logIn(@Body() logInDto: logInDto) {
        return this.authenticationService.verifyUser(logInDto.email, logInDto.password);
    }


    @skipAuth()
    @Post("/refresh")
    @HttpCode(200)
    newAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authenticationService.generateNewAccessToken(refreshTokenDto.refreshToken);
    }
}
