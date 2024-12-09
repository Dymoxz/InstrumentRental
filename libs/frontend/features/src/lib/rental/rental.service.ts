import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICreateRental, IRental, IUpdateRental, ApiResponse } from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';

@Injectable({
  providedIn: 'root'
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
    return this.http.put<ApiResponse<IRental>>(`${this.endpoint}/${id}`, data).pipe(
      map((response: ApiResponse<IRental>) => response.results as IRental),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
