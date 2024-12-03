import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional
} from 'class-validator';
import {
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  Gender
} from '@InstrumentRental/shared/api';

export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;
}

export class UpdateUserDto implements IUpdateUser {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;
}
