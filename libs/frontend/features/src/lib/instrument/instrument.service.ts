import { Observable, forkJoin, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { ApiResponse, IInstrument, IUser } from '@InstrumentRental/shared/api';
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
  userEndpoint = env.dataApiUrl + '/user'; // Add this line

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
   * Get all recommended items
   *
   */
  public getRecommended(email: string, options?: any): Observable<IInstrument[]> {
  return this.http
    .get<ApiResponse<IInstrument[]>>(`${this.endpoint}/recommended/${email}`, {
      ...options,
      ...httpOptions
    })
    .pipe(
      map((response: any) => response.results as IInstrument[]),
      tap((response: any) => console.log(`Recommended instruments: ${response.results}`)),
      catchError(this.handleError)
    );
}

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<{ instrument: IInstrument, user: IUser }> {
    return this.http
      .get<ApiResponse<IInstrument>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IInstrument),
        catchError(this.handleError),
        switchMap((instrument: IInstrument) =>
          forkJoin({
            instrument: of(instrument),
            user: this.http.get<ApiResponse<IUser>>(`${this.userEndpoint}/${instrument.ownerEmail}`, {
              ...options,
              ...httpOptions,
            }).pipe(
              map((response: any) => response.results as IUser),
              catchError(this.handleError)
            )
          })
        )
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
   * Create a new instrument.
   *
   * @param instrument - The instrument to create
   * @param options - Optional URL query parameters
   */
  public create(
    instrument: IInstrument,
    options?: any
  ): Observable<IInstrument> {
    console.log(`create ${this.endpoint}`);
    return this.http
      .post<ApiResponse<IInstrument>>(this.endpoint, instrument, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap((response: any) =>
          console.log(`Created instrument: ${response.results}`)
        ),
        map((response: any) => response.results as IInstrument),
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing instrument.
   *
   * @param id - The ID of the instrument to update
   * @param instrument - The updated instrument data
   * @param options - Optional URL query parameters
   */
  public update(
    id: string,
    instrument: Partial<IInstrument>,
    options?: any
  ): Observable<IInstrument> {
    console.log(`update ${this.endpoint}`);
    return this.http
      .put<ApiResponse<IInstrument>>(`${this.endpoint}/${id}`, instrument, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap((response: any) =>
          console.log(`Updated instrument: ${response.results}`)
        ),
        map((response: any) => response.results as IInstrument),
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
