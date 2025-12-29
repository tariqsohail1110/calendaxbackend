import { Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { BadRequestException } from "src/utils/exceptions/common.exceptions";
import { User } from "../database/user.orm";
import { TimeoutError } from "rxjs";
import { DeleteResult } from "typeorm";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { EmailAlreadyExistsException } from "src/utils/exceptions/email-already-exists.exception";
import { UpdateResult } from "typeorm/browser";

@Injectable()
export class UserService{
    constructor(
        private readonly userRepository: UserRepository
    ){}


    async getUser(userId: User['id']): Promise<User>{
        try{
            const user = await this.userRepository.getById(userId);
            if(!user){
                throw new NotFoundException();
            }
            return user;
            // return UserMapper.toDtoWithRelations(user);
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }


    async getUserByEmail(email: User['email']): Promise<User>{
        try{
            const user = await this.userRepository.getByEmail(email);
            if(!user){
                throw new NotFoundException();
            }
            return user;
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }


    async getUserWithPI(){
        return await this.userRepository.getUserWithPI(); 
    }    


    async getUserByIdWithPI(id: number): Promise<User>{
        try{
            const user = await this.userRepository.getByIDWithPI(id);
            if(!user){
                throw new NotFoundException();
            }
            return user;
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }


    async createUser(payload: CreateUserRequestDto): Promise<User>{
        const exitingUser = await this.userRepository.getByEmail(payload.email);
        if (exitingUser){ throw new EmailAlreadyExistsException();}
        const newUser = await this.userRepository.create(payload);
        return newUser;
    }


    async updateUser(id: number, payload: CreateUserRequestDto):
    Promise<UpdateResult>{
        try{
            const user = await this.userRepository.getById(id);
            if(!user){
                throw new NotFoundException("User Not Found");
            }
            return await this.userRepository.update(id, payload);
        }catch(error){
            throw new BadRequestException(error.msg);
        }
    }



    async deleteUser(id: User['id']): Promise<DeleteResult>{
        let userEntity = await this.userRepository.getById(id);
        if(!userEntity){
            throw new NotFoundException();
        }
        try{
            return await this.userRepository.delete(id);
        }catch(error){
            if(error instanceof TimeoutError){
                throw new RequestTimeoutException();
            }else{
                throw new BadRequestException(error.message);
            }
        }
    }
}