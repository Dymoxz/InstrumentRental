import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  Address,
  Gender,
  IInstrument,
  IUser,
} from '@InstrumentRental/shared/api';

export type UserDocument = User & Document;

class AddressSchema implements Address {
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

  @Prop({ required: true, unique: true })
  @IsEmail()
  email!: string;

  @Prop({ required: true })
  @IsString()
  password!: string;

  @Prop()
  @IsString()
  phoneNumber!: string;

  @Prop()
  @IsString()
  bio!: string;

  @Prop({ type: String, enum: Gender })
  @IsEnum(Gender)
  gender!: Gender;

  @Prop({ required: true, type: AddressSchema })
  @ValidateNested()
  @Type(() => AddressSchema)
  address!: AddressSchema;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Instrument' })
  instruments!: IInstrument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
