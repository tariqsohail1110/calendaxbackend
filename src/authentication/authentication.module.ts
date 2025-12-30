import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/authentication.controller";
import { LoginService } from "./services/login.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/utils/value-objects/constants";

const controllers = [AuthenticationController];
const services = [LoginService];

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.access_token_secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers,
    providers: [...services],
})

export class AuthenticationModule {}