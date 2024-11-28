import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { IReview } from '@InstrumentRental/shared/api';
import {
  CreateReviewDto,
  UpdateReviewDto,
} from '@InstrumentRental/backend/dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get('')
  getAll(): IReview[] {
    return this.reviewService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IReview {
    return this.reviewService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateReviewDto): IReview {
    return this.reviewService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.reviewService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateReviewDto): IReview {
    return this.reviewService.update(id, data);
  }
}
