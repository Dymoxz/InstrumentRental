import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IReview } from '@InstrumentRental/shared/api';
import { IsMongoId } from 'class-validator';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review implements IReview {
  @IsMongoId()
  _id!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  rating!: number;

  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  reviewerEmail!: string;

  @Prop({ required: true })
  revieweeEmail!: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
