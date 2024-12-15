import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IReview } from '@InstrumentRental/shared/api';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'lib-review-create',
  templateUrl: './review.create.component.html',
})
export class ReviewCreateComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup;
  subscription: Subscription | undefined = undefined;
  reviewerEmail: string | null = null;
  revieweeEmail: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, this.ratingValidator]],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reviewerEmail = this.getReviewerEmailFromToken();
    this.revieweeEmail = this.route.snapshot.paramMap.get('id');
  }

  private getReviewerEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.email || null;
    }
    return null;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  goBack(): void {
    window.history.back();
  }

  saveReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const reviewData: IReview = {
      _id: `review-${Math.floor(Math.random() * 100000)}`,
      content: this.reviewForm.get('content')?.value,
      rating: this.reviewForm.get('rating')?.value,
      date: new Date(),
      reviewerEmail: this.reviewerEmail || '',
      revieweeEmail: this.revieweeEmail || '',
    };

    this.reviewService.create(reviewData).subscribe(() => {
      console.log('Review created:', reviewData);
      this.goBack();
    }, (error) => {
      console.error('Error creating review:', error);
    });
  }

  private ratingValidator(control: AbstractControl): ValidationErrors | null {
    return control.value >= 1 ? null : { minRating: true };
  }
}
