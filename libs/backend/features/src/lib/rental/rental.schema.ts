// libs/backend/features/src/lib/rental/rental.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IRental, RentalStatus, IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { IsMongoId, IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { Id } from '@InstrumentRental/shared/api';

export type RentalDocument = HydratedDocument<Rental>;

@Schema()
export class Rental implements IRental {
  @IsMongoId()
  _id!: string;

  @Prop({ required: true })
  @IsDate()
  startDate!: Date;

  @Prop({ required: true })
  @IsDate()
  endDate!: Date;

  @Prop({ required: true })
  @IsNumber()
  totalPrice!: number;

  @Prop({ required: true })
  @IsString()
  reason!: string;

  @Prop({ required: true, type: String, enum: RentalStatus })
  @IsEnum(RentalStatus)
  status!: RentalStatus.pendingApproval;

  @Prop({ required: true })
  @IsMongoId()
  instrumentId!: string;

  @Prop({ required: true })
  @IsString()
  instrumentOwnerEmail!: string;

  @Prop({ required: true })
  @IsString()
  renterEmail!: string;

  id!: Id;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
