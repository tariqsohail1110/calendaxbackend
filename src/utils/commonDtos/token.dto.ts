import { IsNotEmpty, IsString } from "class-validator";
import { UserResponseDto } from "src/user/dtos/user-response.dto";

export class TokenDto extends UserResponseDto{
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}