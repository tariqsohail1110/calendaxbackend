import { Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Put, 
    Delete} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserServices } from "src/user/services/user.services.ts";
import { CreateUserRequestDto, UpdateUserRequestDto, UserResponseDto } from "../dtos";
import { ApiPaginationQueries } from "src/utils/decorators/api-pagination-queries.decorator";
import { PaginationRequest } from "src/utils/pagination/pagination-request.interface";
import { User } from "src/user/database/user.orm.ts";
import { DeleteResult } from "typeorm";
// import { UserMapper } from "src/utils/mappers/users.mapper";

@Controller('v1/users')
@ApiTags('Users')
export class UserController{
    constructor(
        private readonly userServices: UserServices
    ) {}


    // @Get('/me/:id')
    // @HttpCode(200)
    // async getMyProfile(
    //     @Param('userId') userId: number
    // ): Promise<UserResponseDto>{
    //     const userProfile = await this.userServices.getUser(userId);
    //     return await UserMapper.toDtoWithRelations(userProfile);
    // }


    // @Get('/')
    // @ApiPaginationQueries([
    //     {
    //         name: 'roleId',
    //         type: Number,
    //         description: 'Role Id',
    //         required: false,
    //     },
    //     {
    //         name: 'isPrincipalInvestigator',
    //         type: Boolean,
    //         description: 'Filter by Principal Investigator',
    //         required: false,
    //     },
    // ])
    // // @Permissions('users.view)
    // @HttpCode(200)
    // async getUsers(
    //     @PaginationParams() pagination: PaginationRequest
    // ): Promise<PaginationResponseDto<UserResponseDto>>{
    //     return await this.userServices.getUsers(pagination);
    // }


    @Get('/with-pi')
    // @Permissions('user.view')
    @HttpCode(200)
    async getUserwithPI(): Promise<any>{
        return await this.userServices.getUserWithPI();
    }


    @Get('/:id')
    // @Permissions('user.view')
    @HttpCode(200)
    async getUser(@Param('id', ParseIntPipe) id: User['id']): Promise<any>{
        return await this.userServices.getUser(id);
    }


    @Post('/')
    // @Permissions('user.add')
    @HttpCode(200)
    async createUser(@Body() data: CreateUserRequestDto): Promise<any>{
        return await this.userServices.createUser(data);
    }


    // async assignRleToUser()
    // async assignEventToUser()


    @Put('/:id')
    // @Permissions('user.update')
    @HttpCode(200)
    async updateUser(
        @Param('id') id: number,
        @Body() data: UpdateUserRequestDto
    ): Promise<any>{
        return await this.userServices.updateUser(id, /*data*/ null);
    }


    @Delete('/:id')
    // @Permissions('user.delete')
    @HttpCode(200)
    async deleteUser(
        @Param('id', ParseIntPipe)id: number
    ): Promise<DeleteResult>{
        return await this.userServices.deleteUser(id);
    }

    
}