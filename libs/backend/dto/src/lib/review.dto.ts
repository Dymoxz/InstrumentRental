import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsEmail
} from 'class-validator';
import {
  ICreateReview,
  IUpdateReview,
} from '@InstrumentRental/shared/api';

export class CreateReviewDto implements ICreateReview {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  @IsNotEmpty()
  rating!: number;

  @IsDate()
  @IsNotEmpty()
  date!: Date;

  @IsEmail()
  @IsNotEmpty()
  reviewerEmail!: string;

  @IsEmail()
  @IsNotEmpty()
  revieweeEmail!: string;
}

export class UpdateReviewDto implements IUpdateReview {
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsNumber()
  @IsNotEmpty()
  rating?: number;

  @IsDate()
  @IsNotEmpty()
  date?: Date;

  @IsEmail()
  @IsNotEmpty()
  reviewerEmail?: string;

  @IsEmail()
  @IsNotEmpty()
  revieweeEmail?: string;
}
