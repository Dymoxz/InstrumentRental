import { Module } from '@nestjs/common';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema, collection: 'Review' },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
