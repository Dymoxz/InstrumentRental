import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { ICreateReview, IReview, IUpdateReview } from '@InstrumentRental/shared/api';

@Injectable()
export class ReviewService {
  TAG = 'ReviewService';

  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>
  ) {}

  async getAll(): Promise<IReview[]> {
    Logger.log(`Finding all reviews`, this.TAG);
    const reviews = await this.reviewModel.find();
    Logger.log(`Found reviews: ${JSON.stringify(reviews, null, 2)}`, this.TAG);
    return reviews;
  }

  async getOne(_id: string): Promise<IReview | null> {
    Logger.log(`Finding review with id ${_id}`);
    const review = await this.reviewModel.findOne({ _id }).exec();
    if (!review) {
      Logger.debug('Review not found');
    }
    return review;
  }

  async create(createReviewDto: ICreateReview): Promise<IReview> {
    Logger.log('Creating review', this.TAG);
    const createdReview = new this.reviewModel({
      ...createReviewDto,
      _id: new Types.ObjectId(),
    });
    return createdReview.save();
  }

  async update(_id: string, updateReviewDto: IUpdateReview): Promise<IReview> {
    Logger.log(`Updating review with id ${_id}`, this.TAG);
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(_id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException(`Review could not be found!`);
    }
    return updatedReview;
  }

  async delete(_id: string): Promise<void> {
    Logger.log(`Deleting review with id ${_id}`, this.TAG);
    const result = await this.reviewModel.findByIdAndDelete(_id).exec();
    if (!result) {
      throw new NotFoundException(`Review could not be found!`);
    }
  }
}
