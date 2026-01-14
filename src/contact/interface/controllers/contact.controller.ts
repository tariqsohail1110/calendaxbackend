import { Body, Controller, Delete, HttpCode, Param, Post, Put, Get } from "@nestjs/common";
import { ContactService } from "src/contact/services/contact.service";
import { CreateContactDto } from "../dtos/create-contact.dto";
import { Contact } from "src/contact/database/contact.orm";
import { ContactResponseDto } from "../dtos/contact-response.dto";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

@Controller('v1/contacts')
@ApiTags('contacts')
export class ContactController{
    constructor(private readonly contactService: ContactService){}
    @Get('/')
    async getContacts(): Promise<any>{
        return await this.contactService.getContacts();
    }


    @Get('/:id')
    async getContactById(@Param('id') id: number): Promise<ContactResponseDto>{
        return await this.contactService.getContact(id);
    }

    @Post('/')
    @HttpCode(201)
    async create(@Body() payload: CreateContactDto): Promise<ContactResponseDto> {
        return await this.contactService.createContact(payload);
    }


    @Put('/:id')
    @HttpCode(201)
    async update(@Param('id') id: number, @Body() payload: CreateContactDto):
    Promise<ContactResponseDto>{
        return await this.contactService.updateContact(id, payload);
    }


    @Delete('/:id')
    @HttpCode(201)
    async delete(@Param('id') id: number): Promise<DeleteResult>{
        return await this.contactService.deleteContact(id);
    }
}