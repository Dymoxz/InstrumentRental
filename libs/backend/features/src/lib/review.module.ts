import { Module } from '@nestjs/common';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
