import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserStatus } from "src/app/identity-and-access/domain/value-objects/user-status.vo";
import { Email } from "src/app/common/value-object/email";
import { PlainPassword } from "src/app/identity-and-access/domain/value-objects/password";

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export class CreateUserRequestDto {
  @ApiProperty({
    description: "The first name of the user",
    maxLength: 75,
    example: "Afham",
  })
  @IsNotEmpty()
  @MaxLength(75)
  @IsString()
  firstName: string;

  // @ApiPropertyOptional({ description: 'The middle name of the user', maxLength: 100, required: false })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: "The last name of the user",
    maxLength: 75,
    example: "Ahmed",
  })
  @IsNotEmpty()
  @MaxLength(75)
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "afham@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: Email;

  @ApiProperty({
    description: "Is user PI",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrincipalInvestigator: boolean;

  // @ApiPropertyOptional({ description: 'The date when the email was verified (optional)', required: false })
  @IsOptional()
  @IsDateString()
  emailVerifiedAt?: Date;

  // @ApiProperty()
  @IsOptional()
  password: PlainPassword;

  // @ApiProperty({ description: 'The date when the password expires (optional)', required: false })
  @IsOptional()
  @IsDateString()
  passwordExpiresAt: Date;

  @ApiProperty({
    description: "The primary phone number of the user",
    example: "+1-516-316-4146",
  })
  @IsNotEmpty()
  phoneNumber1: string;

  // @ApiPropertyOptional({ description: 'The secondary phone number of the user (optional)', required: false })
  @IsOptional()
  phoneNumber2: string;

  // @ApiPropertyOptional({ description: 'The number of failed login attempts (optional)', required: false })
  @IsOptional()
  @IsInt()
  failedAttempts?: number;

  // @ApiPropertyOptional({ description: 'Whether the user’s password has been reset (optional)', required: false })
  @IsOptional()
  @IsBoolean()
  isPasswordReset?: boolean;

  // @ApiPropertyOptional({ description: 'Whether notifications are enabled for the user (optional)', required: false })
  @IsOptional()
  @IsBoolean()
  isNotificationEnabled?: boolean;

  // @ApiPropertyOptional({ description: 'The date of the last failed login attempt (optional)', required: false })
  @IsOptional()
  @IsDateString()
  lastFailedAttempt?: Date;

  // @ApiPropertyOptional({ description: 'The date until the user’s account is locked (optional)', required: false })
  @IsOptional()
  @IsDateString()
  lockedUntil?: Date;

  // @ApiPropertyOptional({ description: 'Whether the user is a patient (optional)', required: false })
  @IsOptional()
  @IsBoolean()
  isPatient: boolean;

  // @ApiPropertyOptional({ description: 'Whether the user is an admin (optional)', required: false })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  // @ApiPropertyOptional({ description: 'Whether the user is a superuser (optional)', required: false })
  @IsOptional()
  @IsBoolean()
  isSuperUser: boolean;

  // @ApiPropertyOptional({ description: 'The current status of the user (optional)', enum: UserStatus, required: false })
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  // @ApiPropertyOptional({ description: 'A list of permissions assigned to the user (optional)', required: false, type: [Number], example: [1] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  permissions: number[];

  // @ApiProperty({ description: 'A list of roles assigned to the user', type: [Number], example: [1] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roles: number[];
}
