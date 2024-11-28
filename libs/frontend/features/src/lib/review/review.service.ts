import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IReview, ICreateReview } from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  endpoint = env.dataApiUrl + '/review';

  constructor(private readonly http: HttpClient) {}

  getAll(options?: any): Observable<IReview[]> {
    return this.http
      .get<IReview[]>(this.endpoint, { ...options })
      .pipe(tap(console.log), catchError(this.handleError));
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
