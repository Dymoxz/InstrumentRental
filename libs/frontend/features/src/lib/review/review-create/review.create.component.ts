import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IReview } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';

@Component({
  selector: 'lib-review-create',
  templateUrl: './review.create.component.html',
})
export class ReviewCreateComponent implements OnInit, OnDestroy {
  review: IReview | null = null;
  subscription: Subscription | undefined = undefined;
  rating = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.review = this.CreateEmptyReview();
    console.log('Initial review:', this.review);
  }

  private CreateEmptyReview(): IReview {
    return {
      _id: '',
      content: '',
      rating: 0,
      date: new Date(),
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  goBack(): void {
    window.history.back();
  }

  saveReview(): void {
    if (this.review) {
      console.log('Saving review with rating:', this.rating);
      const reviewData: IReview = {
        _id: `review-${Math.floor(Math.random() * 100000)}`,
        content: this.review.content,
        rating: this.rating,
        date: this.review.date,
      };
      console.log('Review data to be saved:', reviewData);
      this.reviewService.create(reviewData).subscribe(() => {
        this.router.navigate(['/my-instruments']);
      });
    }
  }

  setRating(star: number): void {
    this.rating = star;
  }
}
