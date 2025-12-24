import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./database/user.orm";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserServices } from "./services/user.services";
import { Module } from "@nestjs/common";

const controllers = [UserController];
const services = [UserServices];
const repositories = [UserRepository];

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers,
    providers: [...services, ...repositories],
})

export class UserModule {}