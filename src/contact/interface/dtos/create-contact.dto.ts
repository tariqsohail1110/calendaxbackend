import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateContactDto{
    @ApiProperty({
        description: 'First name',
        example: 'David',
        required: false,
    })
    @IsString()
    @IsOptional()
    first_name?: string;


    @ApiProperty({
        description: 'Last name',
        example: 'John',
        required: false,
    })
    @IsString()
    @IsOptional()
    last_name?: string;


    @ApiProperty({
        description: 'Email',
        example: 'davidjohndev1@gmail.com',
        required: false,
    })
    @IsString({ message: 'Email required' })
    @IsOptional()
    email?: string;


    @ApiProperty({
        description: 'Phone number',
        example: '7462734672',
        required: false,
    })
    @IsString()
    @IsOptional()
    phone_number?: string;


    @ApiProperty({
        description: 'Note',
        example: 'testing',
        required: false,
    })
    @IsString()
    @IsOptional()
    note?: string;


    @ApiProperty({
        description: 'Reply',
        example: 'testing',
        required: false,
    })
    @IsString()
    @IsOptional()
    reply?: string;
}