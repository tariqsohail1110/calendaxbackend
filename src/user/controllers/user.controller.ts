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
import { UserService } from "src/user/services/user.service";
import { User } from "src/user/database/user.orm";
import { DeleteResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";

@Controller('v1/users')
@ApiTags('Users')
export class UserController{
    constructor(
        private readonly userService: UserService
    ) {}


    @Get('/with-pi')
    @ApiParam({ name: 'pi',
        type: Number, 
        description: 'The Patient Id of the user',
        example: 1,
        required: true })
    @HttpCode(200)
    async getUserwithPI(): Promise<User[] | null>{
        return await this.userService.getUserWithPI();
    }


    @Get('/email')
    @ApiParam({ name: 'email',
        type: String,
        description: "User's Email Address",
        example: 'user@mail.com',
        required: true })
    @HttpCode(200)
    async getUserByEmail(@Query('email') email: User['email']): Promise<User>{
        return await this.userService.getUserByEmail(email);
    }


    @Get(':id')
    @ApiParam({ name: 'id',
        type: Number,
        description: 'User ID',
        example: 1,
        required: true })
    @HttpCode(200)
    async getUser(@Param('id', ParseIntPipe) id: User['id']): Promise<User>{
        return await this.userService.getUser(id);
    }


    @Post('/')
    @HttpCode(200)
    async createUser(@Body() data: CreateUserRequestDto): Promise<User>{
        return await this.userService.createUser(data);
    }


    @Put('/:id')
    @HttpCode(200)
    async updateUser(
        @Param('id') id: number,
        @Body() data: CreateUserRequestDto
    ): Promise<UpdateResult>{
        return await this.userService.updateUser(id, data);
    }


    @Delete('/:id')
    @HttpCode(200)
    async deleteUser(
        @Param('id', ParseIntPipe)id: number
    ): Promise<DeleteResult>{
        return await this.userService.deleteUser(id);
    }
}