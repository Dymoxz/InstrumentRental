import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate
} from 'class-validator';
import {
  ICreateReview,
  IUpdateReview,
  IUpsertReview
} from '@InstrumentRental/shared/api';

export class CreateReviewDto implements ICreateReview {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  @IsNotEmpty()
  rating!: number;
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
}

export class UpsertReviewDto implements IUpsertReview {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsNumber()
  @IsNotEmpty()
  rating!: number;
}
