import { BadRequestException, Injectable } from "@nestjs/common";
import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { Contact } from "../database/contact.orm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ContactRepository{
    constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>){}
    async getContacts(): Promise<[questionEntities: Contact[], totalQuestions: number]> {
        console.log(`>> ${this.contactRepository}`);
        return await this.contactRepository.findAndCount();
    }


    async getById(id: Contact['id']):Promise<Contact | null>{
        const site = await this.contactRepository.findOneBy({id});
        if (site === null){
            return null;
        }
        return site;
    }

    
    async create(site: DeepPartial<Contact>): Promise<Contact> {
        const contactCreated = await this.contactRepository.save(site);
        return contactCreated;
    }


    async update(
        id: Contact['id'],
        site: DeepPartial<Contact>,
    ): Promise<Contact | null> {
        const existingEntity = await this.contactRepository.findOne({
            where: { id } });

        if (!existingEntity){
            throw new BadRequestException('Contact not found.');
        }

        const savedEntity = await this.contactRepository.update(id, site);
        const updatedEntity =  await this.contactRepository.findOneBy({id});
        return updatedEntity;
    }
    
    
    async delete(id: Contact['id']): Promise<DeleteResult>{
        const deletedContact = await this.contactRepository.delete({id})
        return deletedContact
    }
}
