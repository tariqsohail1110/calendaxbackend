import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JWTService } from "src/utils/commonservices/jwt.service";
import { AuthenticationService } from "./services/auth.service";

const controllers = [AuthenticationController];
const services = [AuthenticationService, JWTService];

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