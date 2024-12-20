import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse, IInstrument } from '@InstrumentRental/shared/api';
import { Injectable } from '@angular/core';
import { env } from '@InstrumentRental/shared/util-env';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class InstrumentService {
  /*
    endpoint = 'http://localhost:3000/api/instrument';
  */
  endpoint = env.dataApiUrl + '/instrument';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IInstrument[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IInstrument[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IInstrument[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<IInstrument> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IInstrument>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IInstrument),
        catchError(this.handleError)
      );
  }

  /**
 * Delete a single item from the service.
 *
 */
public delete(id: string | null, options?: any): Observable<void> {
  console.log(`delete ${this.endpoint}`);
  return this.http
    .delete<void>(`${this.endpoint}/${id}`, {
      ...options,
      ...httpOptions,
    })
    .pipe(
      tap(() => console.log(`Deleted item with id: ${id}`)),
      catchError(this.handleError)
    );
}

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in InstrumentService', error);

    return throwError(() => new Error(error.message));
  }

}
