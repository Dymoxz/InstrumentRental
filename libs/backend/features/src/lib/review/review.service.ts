import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import {
  ICreateReview,
  IReview,
  IUpdateReview,
} from '@InstrumentRental/shared/api';

@Injectable()
export class ReviewService {
  private reviews$ = new BehaviorSubject<IReview[]>([
    {
      id: '1',
      content: 'The instrument was in excellent condition and performed beautifully during our concert. The sound quality was top-notch, and it was easy to handle. The rental process was smooth, and the staff was very helpful. Highly recommend this service for anyone looking to rent high-quality instruments for their events or personal use. Will definitely use this service again in the future.',
      rating: 5,
      date: new Date('2023-01-01'),
    },
    {
      id: '2',
      content: 'I rented a piano for a special event, and it exceeded my expectations. The piano was well-maintained and delivered on time. The sound was rich and resonant, perfect for our performance. The rental process was straightforward, and the customer service was excellent. I would highly recommend this service to anyone in need of a reliable and high-quality instrument rental.',
      rating: 4,
      date: new Date('2023-02-15'),
    },
    {
      id: '3',
      content: 'Rented a drum set for a recording session, and it was fantastic. The drums were in great condition, and the sound was exactly what we needed. The rental process was hassle-free, and the staff was very accommodating. The price was reasonable, and the quality of the instruments was impressive. I will definitely be renting from this service again for future projects.',
      rating: 5,
      date: new Date('2023-03-10'),
    },
  ]);

  getAll(): IReview[] {
    return this.reviews$.value;
  }

  getOne(id: string): IReview {
    const review = this.reviews$.value.find((review) => review.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  }

  create(data: ICreateReview): IReview {
    const newReview: IReview = {
      id: (this.reviews$.value.length + 1).toString(),
      ...data,
      date: new Date(),
    };
    this.reviews$.next([...this.reviews$.value, newReview]);
    return newReview;
  }

  update(id: string, data: IUpdateReview): IReview {
    const reviewIndex = this.reviews$.value.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    const updatedReview = { ...this.reviews$.value[reviewIndex], ...data };
    this.reviews$.value[reviewIndex] = updatedReview;
    this.reviews$.next([...this.reviews$.value]);
    return updatedReview;
  }

  delete(id: string): void {
    const reviewIndex = this.reviews$.value.findIndex((review) => review.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    this.reviews$.next(this.reviews$.value.filter((review) => review.id !== id));
  }
}
