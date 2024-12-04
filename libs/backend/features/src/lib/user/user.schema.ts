import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser, Gender } from '@InstrumentRental/shared/api';
import { IsMongoId, IsString, IsEmail, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

class Address {
  @Prop({ required: true })
  @IsString()
  streetName!: string;

  @Prop({ required: true })
  @IsString()
  houseNumber!: string;

  @Prop({ required: true })
  @IsString()
  postalCode!: string;

  @Prop({ required: true })
  @IsString()
  city!: string;

  @Prop({ required: true })
  @IsString()
  country!: string;
}


@Schema()
export class User implements IUser {
  @IsMongoId()
  _id!: string;

  @Prop({ required: true })
  @IsString()
  firstName!: string;

  @Prop({ required: true })
  @IsString()
  lastName!: string;

  @Prop({ required: true, type: String, enum: Gender })
  @IsEnum(Gender)
  gender!: Gender;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email!: string;

  @Prop({ required: true })
  @IsString()
  password!: string;

  @Prop({ required: true })
  @IsString()
  phoneNumber!: string;

  @Prop()
  @IsString()
  bio!: string;

  @Prop({ required: true, type: Address })
  @ValidateNested()
  @Type(() => Address)
  address!: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
