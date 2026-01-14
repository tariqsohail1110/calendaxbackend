import { BadRequestException, Injectable } from "@nestjs/common";
import { Contact } from "../database/contact.orm"
import { ContactRepository } from "../repositories/contact.repository";
import { CreateContactDto } from "../interface/dtos/create-contact.dto";
import { DeepPartial, DeleteResult } from "typeorm";

@Injectable()
export class ContactService {
    constructor(private readonly contactRepository: ContactRepository){}
    async getContacts(): Promise<[contactEntities: Contact[], totalContacts: number]>{
        return await this.contactRepository.getContacts();
    }

    
    async getContact(contactId: Contact['id']): Promise<Contact>{
        try{
            const contact = await this.contactRepository.getById(contactId);
            if (!contact){
                throw new BadRequestException('Contact not found');
            }
            return contact;
        }catch (error){
            throw new BadRequestException(error.message);
        }
    }


    async createContact(payload: CreateContactDto): Promise<Contact> {
        try{
            const createdContact = await this.contactRepository.create(payload); 
            if (!createdContact) {
                throw new BadRequestException("Contact could not be created");
            }
            return createdContact;
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }


    async updateContact(contactId: Contact['id'], data : DeepPartial<Contact>):
        Promise<Contact>{
            try{
                const updatedContact = await this.contactRepository.update(contactId, data);
                if (!updatedContact){
                    throw new BadRequestException("Contact could not be updated");
                }
                return updatedContact;
        }catch (error){
            throw new BadRequestException(error.message);
        }
    }


    async deleteContact(contactId: Contact['id']): Promise<DeleteResult>{
        try{
            const deletedContact = await this.contactRepository.delete(contactId);
            if (!deletedContact){
                throw new BadRequestException('Contact could be deleted');
            }
            return deletedContact;
        }catch (error){
            throw new BadRequestException(error.message);
        }
    }
}       