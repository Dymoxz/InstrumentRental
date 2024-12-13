import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  ApiResponse,
  ICreateRental,
  IInstrument,
  IRental,
  IUpdateRental,
  IUser,
  RentalStatus,
} from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private endpoint = `${env.dataApiUrl}/rental`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IRental[]> {
    return this.http.get<ApiResponse<IRental[]>>(this.endpoint).pipe(
      map((response: ApiResponse<IRental[]>) => response.results as IRental[]),
      catchError(this.handleError)
    );
  }

  getByStatusAndOwnerEmail(
    status: RentalStatus,
    ownerEmail: string
  ): Observable<IRental[]> {
    return this.http
      .get<ApiResponse<IRental[]>>(`${this.endpoint}/status`, {
        params: { status, ownerEmail },
      })
      .pipe(
        map(
          (response: ApiResponse<IRental[]>) => response.results as IRental[]
        ),
        switchMap((rentals: IRental[]) =>
          forkJoin(
            rentals.map((rental) =>
              forkJoin({
                instrument: this.http
                  .get<ApiResponse<IInstrument>>(
                    `${env.dataApiUrl}/instrument/${rental.instrumentId}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IInstrument>) =>
                        response.results as IInstrument
                    )
                  ),
                owner: this.http
                  .get<ApiResponse<IUser>>(
                    `${env.dataApiUrl}/user/${rental.instrumentOwnerEmail}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IUser>) =>
                        response.results as IUser
                    )
                  ),
                renter: this.http
                  .get<ApiResponse<IUser>>(
                    `${env.dataApiUrl}/user/${rental.renterEmail}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IUser>) =>
                        response.results as IUser
                    )
                  ),
              }).pipe(
                map(({ instrument, owner, renter }) => ({
                  ...rental,
                  instrument,
                  instrumentOwner: owner,
                  renter,
                })),
                catchError(() =>
                  of({
                    ...rental,
                    instrument: null,
                    instrumentOwner: null,
                    renter: null,
                  })
                )
              )
            )
          )
        ),
        catchError(this.handleError)
      );
  }

  getByRenterEmail(renterEmail: string): Observable<IRental[]> {
    return this.http
      .get<ApiResponse<IRental[]>>(`${this.endpoint}/renter`, {
        params: { renterEmail },
      })
      .pipe(
        map(
          (response: ApiResponse<IRental[]>) => response.results as IRental[]
        ),
        switchMap((rentals: IRental[]) =>
          forkJoin(
            rentals.map((rental) =>
              forkJoin({
                instrument: this.http
                  .get<ApiResponse<IInstrument>>(
                    `${env.dataApiUrl}/instrument/${rental.instrumentId}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IInstrument>) =>
                        response.results as IInstrument
                    )
                  ),
                owner: this.http
                  .get<ApiResponse<IUser>>(
                    `${env.dataApiUrl}/user/${rental.instrumentOwnerEmail}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IUser>) =>
                        response.results as IUser
                    )
                  ),
                renter: this.http
                  .get<ApiResponse<IUser>>(
                    `${env.dataApiUrl}/user/${rental.renterEmail}`
                  )
                  .pipe(
                    map(
                      (response: ApiResponse<IUser>) =>
                        response.results as IUser
                    )
                  ),
              }).pipe(
                map(({ instrument, owner, renter }) => ({
                  ...rental,
                  instrument,
                  instrumentOwner: owner,
                  renter,
                })),
                catchError(() =>
                  of({
                    ...rental,
                    instrument: null,
                    instrumentOwner: null,
                    renter: null,
                  })
                )
              )
            )
          )
        ),
        catchError(this.handleError)
      );
  }

  getOne(id: string): Observable<IRental> {
    return this.http.get<ApiResponse<IRental>>(`${this.endpoint}/${id}`).pipe(
      map((response: ApiResponse<IRental>) => response.results as IRental),
      catchError(this.handleError)
    );
  }

  create(data: ICreateRental): Observable<IRental> {
    return this.http.post<ApiResponse<IRental>>(this.endpoint, data).pipe(
      map((response: ApiResponse<IRental>) => response.results as IRental),
      catchError(this.handleError)
    );
  }

  update(id: string, data: IUpdateRental): Observable<IRental> {
    return this.http
      .put<ApiResponse<IRental>>(`${this.endpoint}/${id}`, data)
      .pipe(
        map((response: ApiResponse<IRental>) => response.results as IRental),
        catchError(this.handleError)
      );
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
