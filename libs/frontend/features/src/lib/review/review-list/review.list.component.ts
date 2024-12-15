import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { IReview } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-review-list',
  templateUrl: './review.list.component.html',
})
export class ReviewListComponent implements OnInit, OnDestroy {
  reviews: IReview[] = [];
  subscription: Subscription | undefined = undefined;
  isLoading = true;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
  this.subscription = this.reviewService.getAll().subscribe((results: IReview[] | null) => {
    this.isLoading = false;
    if (results) {
      this.reviews = results;
      if (this.reviews[0].reviewer) {
        console.log(this.reviews[0].reviewer.firstName);
      }
    } else {
      this.reviews = [];
    }
  });
}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
