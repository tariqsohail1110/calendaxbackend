import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/authentication.controller";
import { LoginService } from "./services/login.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { AuthenticationService } from "./services/authentication.service";

const controllers = [AuthenticationController];
const services = [AuthenticationService, LoginService, JWTService];

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.register({})
    ],
    controllers,
    providers: [...services],
})

export class AuthenticationModule {}