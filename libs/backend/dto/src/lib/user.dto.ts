import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsMongoId
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
  Gender,
  Address
} from '@InstrumentRental/shared/api';
import { InstrumentDto } from './instrument.dto';
import { Prop } from '@nestjs/mongoose'; // Import the appropriate DTO class

class AddressDto implements Address {
  @IsString()
  @IsNotEmpty()
  streetName!: string;

  @IsString()
  @IsNotEmpty()
  houseNumber!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}

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

  @IsNotEmpty()
  address!: Address;
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

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

}

export class UpsertUserDto implements IUpsertUser {
  @IsMongoId()
  _id!: string;

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

  @IsString()
  @IsNotEmpty()
  bio!: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => InstrumentDto) // Use the appropriate DTO class
  instruments!: InstrumentDto[];
}
