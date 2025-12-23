import { Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { PinoLoggerService } from "src/utils/logger/pinoLogger.service";
import { UserRepository } from "../repositories/user.repository.ts";
import { BadRequestException } from "src/utils/exceptions/common.exceptions.js";
import { User } from "../database/user.orm.ts";
import { UserExistsException } from "src/utils/exceptions/user-exists.exception.js";
import { TimeoutError } from "rxjs";
import { DeleteResult } from "typeorm";
import { CreateUserRequestDto } from "../interface/dtos/create-user-request.dto.js";
import { EmailAlreadyExistsException } from "src/utils/exceptions/email-already-exists.exception.js";

@Injectable()
export class UserServices{
    constructor(
        private readonly logger: PinoLoggerService,
        private readonly userRepository: UserRepository
    ){
        this.logger.setContext('User Service');
    }

    // async getUsers(pagination: any): Promise<[questions: User[], total: number]>{
    //     return await this.userRepository.getUsers(pagination);
    // }


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


//     /**
//    * Create new user
//    * @param user {User}
//    * @returns {Promise<User>}
//    */
//     async createUser(user: User): Promise<User>{
//         try{
//             const userEntity = await this.userRepository.create(user);
//             return userEntity;
//         }catch(error){
//             if(error.code == DBErrorCode.PgUniqueConstraintViolation){
//                 throw new UserExistsException(error.message);
//             }
//             if(error instanceof TimeoutError){
//                 throw new RequestTimeoutException();
//             } else{
//                 throw new BadRequestException(error.message);
//             }
//         }
//     }


//     /**
//    * Update user by id
//    * @param id {number}
//    * @param user {User}
//    * @returns {Promise<User>}
//    */
//     async updateUser(id: number, user: User): Promise<User>{
//         let userEntity = await this.userRepository.getById(id);
//         if(!userEntity){
//             throw new NotFoundException();
//         }
//         try{
//             await this.userRepository.update(id, user);
//             userEntity = await this.userRepository.getById(id);
//             return userEntity;
//         }catch(error){
//             if(error.code == DBErrorCode.PgUniqueConstraintViolation){
//                 throw new UserExistsException(error.message);
//             }
//             if(error instanceof TimeoutError){
//                 throw new RequestTimeoutException();
//             }else{
//                 throw new BadRequestException(error.message);
//             }
//         }
//     }



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

        //other services
        // async createUser(payload: { userId: User['id'] }): Promise<User>{
        //     const { userId } = payload;
        //     const user = await this.userRepository.getById(userId);
        //     return user;
        // }


        async getUserWithPI(){
            return await this.userRepository.getUserWithPI(); 
        }


        async createUser(payload: CreateUserRequestDto): Promise<User | string>{ // <= just for now
            // const exitingUser = await this.userRepository.getByEmail(payload.email);
            // if (exitingUser){ throw new EmailAlreadyExistsException();}
            // forEach(payload.roles, async (role) => {
            //     const existingRole = await this.userRepository.getById(role);
            //     if(!existingRole){ throw new NotFoundException('Role not found'); }
            // })

            // let userEntity = UserMapper.toCreateEntity(payload);
            // payload.password = 'pasword' as PlainPassword;
            // const hashedPassword = await this.hashingService.hashPlainPassword(payload.password);
            // userEntity.password = hashedPassword;
            // userEntity = await this.userRepository.create(userEntity);
            // console.log(`User with email ${payload.email} created successfully.`);
            // return userEntity;
            return " ";
        }


        async updateUser(id: number, payload: null /*UpdatePermissionGroupRequestDto*/):
        Promise</*PermissionGroupResponseDto*/string>{
            // const existingPermissionGroup = await this.permissionGroupService.getById(id);
            // if(!existingPermissionGroup){ throw new BadRequestException('Permission Group not found');}
            // let permissionGroupEntity = PermissionGroupMapper.toUpdateEntity
            // (existingPermissionGroup, payload);
            // permissionGroupEntity = await this.permissionGroupService.create
            // (permissionGroupEntity);
            // return PermissionGroupMapper.toDto(permissionGroupEntity);
            return " ";
        }
}