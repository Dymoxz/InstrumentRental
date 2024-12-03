import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser, Gender } from '@InstrumentRental/shared/api';
import { IsMongoId, IsString, IsEmail, IsEnum } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
