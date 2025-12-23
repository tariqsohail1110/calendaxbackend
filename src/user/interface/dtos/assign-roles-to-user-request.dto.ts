import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRolesToUserRequestDto {
  @ApiProperty({ description: 'The id of the user', example: "1" })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'A list of roles assigned to the user', type: [Number], example: [1] })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  roles: number[];
}
