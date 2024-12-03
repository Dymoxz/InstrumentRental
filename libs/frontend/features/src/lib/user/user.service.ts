import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser, ApiResponse } from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';
import { httpOptions } from '../instrument/instrument.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = env.dataApiUrl + '/user';

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  getOne(id: string, options?: any): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.endpoint}/${id}`, { ...options })
      .pipe(tap(console.log), catchError(this.handleError));
  }

  create(data: IUser | null, options?: any): Observable<IUser> {
    return this.http.post<IUser>(this.endpoint, data, { ...options }).pipe(
      tap((response: any) => console.log(`Created user: ${response}`)),
      catchError(this.handleError)
    );
  }

  delete(id: string, options?: any): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`, { ...options })
      .pipe(
        tap(() => console.log(`Deleted user with id: ${id}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('UserService handleError', error);
    return throwError(() => new Error(error.message));
  }
}
