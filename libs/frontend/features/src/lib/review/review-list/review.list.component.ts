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

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.subscription = this.reviewService.getAll().subscribe((results: IReview[] | null) => {
      if (results) {
        this.reviews = results;
      } else {
        this.reviews = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
