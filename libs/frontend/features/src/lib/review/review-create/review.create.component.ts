import { Component, OnDestroy, OnInit } from '@angular/core';
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
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.review = this.CreateEmptyReview();
  }

  private CreateEmptyReview(): IReview {
    return {
      id: '',
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

  saveInstrument(): void {
    if (this.review) {
      this.reviewService.create(this.review).subscribe(() => {
        this.router.navigate(['/my-instruments']);
      });
    }
  }

  setRating(star: number): void {
    this.rating = star;
  }
}
