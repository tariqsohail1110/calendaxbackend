import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../database/user.orm";
import { DeepPartial, FindOptionsWhere, In, Repository } from "typeorm";
import { PinoLoggerService } from "../../utils/logger/pinoLogger.service";
import { permission } from "process";
import tr from "zod/v4/locales/tr.js";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        // private readonly pinoLogger: PinoLoggerService,
        // private readonly paginationService: PaginationService
    ){};

    // private async loadUserPermissions(
    //     user: User,
    //     whereConditions: any,
    //     whereParams: any
    // ): Promise<User>{
    //     //Get all permissions through roles
    //     const rolePermissions = await this.userRepository
    //         .createQueryBuilder('user')
    //         .leftJoin('user.roles', 'role')
    //         .leftJoin('role.permissions', 'permission')
    //         .where(whereConditions, whereParams)
    //         .andWhere("permission.active = :active", { active: true })
    //         .select([
    //             'permission.id',
    //             'permission.name',
    //             'permission.slug',
    //             'permission.description',
    //             'permission.active',
    //         ])
    //         .getRawMany();

        
    //     //Get direct user permissions
    //     const directPermissions = await this.userRepository
    //         .createQueryBuilder('user')
    //         .leftJoin('user.permissions', 'permission')
    //         .where(whereConditions, whereParams)
    //         .andWhere('permission.active = :active', { active: true })
    //         .select([
    //             'permission.id',
    //             'permission.name',
    //             'permission.slug',
    //             'permission.description',
    //             'permission.active',
    //         ])
    //         .getRawMany()

    //     //combine and duplicate permissions
    //     const allPermissions = [...rolePermissions, ...directPermissions];
    //     const uniquePermissions = allPermissions.filter(
    //         (permission, index, self) =>
    //             index ===
    //             self.findIndex((p) => p.permission_id === permission.permission_id)
    //     );

        //attach permissions to user entity
        // user.permissions = Promise.resolve(
        //     uniquePermissions.map((p) => {
        //         const permission = new Permission();
        //         permission.id = p.permission_id;
        //         permission.name = p.permission_name;
        //         permission.slug = p.permission_slug;
        //         permission.description = p.permission_description;
        //         permission.active = p.permission_active;
        //         return permission;
        //     })
        // );
    //     return user;
    // }


    async getByIDWithPI(id: number): Promise</*OrmEntity<User>*/any>{
        const user = await this.userRepository.findOne({
            where: {
                id: id,
                isPrincipalInvestigator: true,
            } as FindOptionsWhere<User>,
            relations: ['roles', 'permissions'],
        });
        return user;
    }


    async findUsersByIds(ids: number[]): Promise<User[]>{
        if(!ids || ids.length === 0) return[];
        const users = await this.userRepository.find({
            where: { id: In(ids) },
            select: ['id', 'email', 'firstName', 'lastName'],
        });
        return users;
    }


    async getUserWithPI(): Promise<User[] | null>{
        const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id as id', 'user.email ad email'])
        .where('user.isPrincipalInvestigator = true')
        .addSelect('CONCAT(user.firstName, " ", user.lastName)', 'fullName')
        .getRawMany();
    return user;
    }


    async getById(userId: User['id']): Promise</*OrmEntity<User> | null*/ any>{
        const user = await this.userRepository.findOne({
            where: { id: userId },
            // relations: ['roles', 'permissions'],
        });

        if(!user){
            return null;
        }

        // return await this.loadUserPermissions(user, 'user.id = :userId', {
        //     userId
        // });
        return user;
    }


    // async getUsers(
    //     /*pagination: PaginationRequest*/
    // ): Promise<[users: User[], total: number]>{
    //     const params = pagination.params;
    //     const hasConditions = Boolean(params.roleId);
    //     const isPrincipalInvestigator = Boolean(params.isPrincipalInvestigator);

    //     const whereCondition = (qb) =>{
    //         const conditions = [];
    //         const parameters = {};

    //         //Add type condition
    //         if (params.roleId){
    //             conditions.push('entity_roles.id = :roleId');
    //             parameters['roleId'] = params.roleId;
    //         }

    //         if(isPrincipalInvestigator){
    //             conditions.push('entity.isPrincipalInvestigator = :isPI');
    //             parameters['roleId'] = params.isPrincipalInvestigator;
    //         }

    //         if(conditions.length){
    //             qb.where(conditions.join(' AND '), parameters);
    //         }
    //     };

    //     return await this.userRepository.getPaginatedDataWithCount(
    //         this.userRepository,
    //         ['roles', 'permissions'],
    //         pagination,
    //         whereCondition
    //     );
    // };


    async getByEmail(email: /*Email*/ any): Promise</*OrmEntity<User> | null*/ User | null>{
        const user = await this.userRepository.findOne({
            where: {email: email},
            // relations: ['roles', 'permissions'],
        });

        if(!user){
            return null;
        }

        // return await this.loadUserPermissions(user, 'user.email =: email', {
        //     email,
        // });
        return user;
    }


    async create(user: DeepPartial<User>): Promise</*OrmEntity<User> | null*/ User>{
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }


    async update(id: User['id'],
        user: DeepPartial<User>
    ): Promise<UpdateResult>{
        return await this.userRepository.update(id, user);
    }


    async delete(id: User['id']): Promise<DeleteResult>{
        return await this.userRepository.delete([id]);
    }
}