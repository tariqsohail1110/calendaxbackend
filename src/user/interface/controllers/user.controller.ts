import { Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Body,
    Put, 
    Delete,
    Query} from "@nestjs/common";
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiTags } from "@nestjs/swagger";
import { UserServices } from "src/user/services/user.services";
import { ApiPaginationQueries } from "src/utils/decorators/api-pagination-queries.decorator";
import { PaginationRequest } from "src/utils/pagination/pagination-request.interface";
import { User } from "src/user/database/user.orm";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { string } from "zod";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { UpdateUserRequestDto } from "../dtos/update-user-request.dto";
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
    @ApiParam({
        name: 'pi',
        type: Number,
        required: true
    })
    // @Permissions('user.view')
    @HttpCode(200)
    async getUserwithPI(): Promise<User[] | null>{
        return await this.userServices.getUserWithPI();
    }


    @Get('/email')
    @ApiQuery({
        name: 'email',
        type: String,
        required: true
    })
    @HttpCode(200)
    async getUserByEmail(@Query('email') email: User['email']): Promise<User>{
        return await this.userServices.getUserByEmail(email);
    }


    @Get('/:id')
    @ApiParam({
        name: 'id',
        type: Number,
        required: true
    })
    // @Permissions('user.view')
    @HttpCode(200)
    async getUser(@Param('id', ParseIntPipe) id: User['id']): Promise<User>{
        return await this.userServices.getUser(id);
    }


    @Post('/')
    // @Permissions('user.add')
    @HttpCode(200)
    async createUser(@Body() data: CreateUserRequestDto): Promise<User>{
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
    ): Promise<UpdateResult>{
        return await this.userServices.updateUser(id, data);
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