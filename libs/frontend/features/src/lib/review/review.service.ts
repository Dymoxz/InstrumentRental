import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IReview, ApiResponse } from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';
import { httpOptions } from '../instrument/instrument.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  endpoint = env.dataApiUrl + '/review';

  constructor(private readonly http: HttpClient, private userService: UserService) {}

  public getAll(options?: any): Observable<IReview[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IReview[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IReview[]),
        catchError(this.handleError),
        switchMap((reviews: IReview[]) => {
          if (!reviews || reviews.length === 0) {
            return of(reviews);
          }

          const reviewsWithUserDetails$ = reviews.map(review =>
            forkJoin({
              review: of(review),
              reviewer: this.userService.getOne(review.reviewerEmail).pipe(
                catchError(() => of(null))
              )
            }).pipe(
              map(({ review, reviewer }) => ({ ...review, reviewer }))
            )
          );

          return forkJoin(reviewsWithUserDetails$);
        }),
        tap(console.log)
      );
  }

  getOne(id: string, options?: any): Observable<IReview> {
    return this.http
      .get<IReview>(`${this.endpoint}/${id}`, { ...options })
      .pipe(tap(console.log), catchError(this.handleError));
  }

  create(data: IReview | null, options?: any): Observable<IReview> {
    return this.http.post<IReview>(this.endpoint, data, { ...options }).pipe(
      tap((response: any) => console.log(`Created review: ${response}`)),
      catchError(this.handleError)
    );
  }

  delete(id: string, options?: any): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`, { ...options })
      .pipe(
        tap(() => console.log(`Deleted review with id: ${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('ReviewService handleError', error);
    return throwError(() => new Error(error.message));
  }
}
