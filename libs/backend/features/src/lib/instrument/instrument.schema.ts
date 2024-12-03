// libs/backend/features/src/lib/instrument/instrument.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IInstrument, InstrumentType } from '@InstrumentRental/shared/api';
import { IsMongoId, IsString } from 'class-validator';
import { Id } from '@InstrumentRental/shared/api';

export type InstrumentDocument = HydratedDocument<Instrument>;

@Schema()
export class Instrument implements IInstrument {
  @IsMongoId()
  _id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, type: String, enum: InstrumentType })
  type!: InstrumentType;

  @Prop({ required: true })
  brand!: string;

  @Prop({ required: true })
  model!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  pricePerDay!: number;

  @Prop({ required: true })
  available!: boolean;

  @Prop({ required: true })
  @IsString()
  ownerEmail!: string;

  id!: Id;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
