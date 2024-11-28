import { Injectable } from '@nestjs/common';
import {
  ICreateReview,
  IReview,
  IUpdateReview,
} from '@InstrumentRental/shared/api';

@Injectable()
export class ReviewService {
  private reviews: IReview[] = [];

  getAll(): IReview[] {
    return this.reviews;
  }

  getOne(id: string): IReview {
    const review = this.reviews.find((review) => review.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  }

  create(data: ICreateReview): IReview {
    const newReview: IReview = {
      id: (this.reviews.length + 1).toString(),
      ...data,
      date: new Date(),
    };
    this.reviews.push(newReview);
    return newReview;
  }

  update(id: string, data: IUpdateReview): IReview {
    const reviewIndex = this.reviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    const updatedReview = { ...this.reviews[reviewIndex], ...data };
    this.reviews[reviewIndex] = updatedReview;
    return updatedReview;
  }

  delete(id: string): void {
    const reviewIndex = this.reviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    this.reviews.splice(reviewIndex, 1);
  }
}
