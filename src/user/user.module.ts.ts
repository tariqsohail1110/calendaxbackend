import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "./database/contact.orm";
import { ContactController } from "./interface/controllers/contact.controller";
import { ContactRepository } from "./repositories/contact.repository";
import { ContactService } from "./services/contact.service";
import { Module } from "@nestjs/common";

const controllers = [ContactController];
const services = [ContactService];
const repositories = [ContactRepository];

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact]),
    ],
    controllers,
    providers: [...services, ...repositories],
})

export class ContactModule {}