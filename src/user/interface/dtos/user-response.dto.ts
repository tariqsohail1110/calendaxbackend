import { ApiProperty } from "@nestjs/swagger";
// import { UserStatus } from "src/app/identity-and-access/domain/value-objects/user-status.vo";
// import { RoleResponseDto } from "../roles";
// import { PermissionResponseDto } from "../permissions";
// import { UserId } from "src/app/identity-and-access/domain/value-objects/user-id.vo";

export class UserResponseDto {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  emailVerifiedAt?: Date;
  phoneNumber1?: string;
  phoneNumber2?: string;
  failedAttempts: number;
  isPasswordReset: boolean;
  isNotificationEnabled: boolean;
  lastFailedAttempt?: Date;
  lockedUntil?: Date;
  // status: UserStatus;
  isPatient: boolean;
  isAdmin: boolean;
  isPrincipalInvestigator: boolean;
  isSuperUser: boolean;
  // roles?: RoleResponseDto[];
  // permissions?: PermissionResponseDto[];
}
