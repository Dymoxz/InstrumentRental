import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  ApiResponse,
  IUpdateUser,
  IUser,
  IUserCredentials,
  IUserIdentity,
  IUserInfo,
} from '@InstrumentRental/shared/api';
import { env } from '@InstrumentRental/shared/util-env';
import { httpOptions } from '../instrument/instrument.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = env.dataApiUrl + '/user';
  authEndpoint = env.dataApiUrl + '/auth';

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

  update(id: string, data: IUpdateUser, options?: any): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.endpoint}/${id}`, data, { ...options })
      .pipe(
        tap((response: any) => console.log(`Updated user: ${response}`)),
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

  login(credentials: IUserCredentials): Observable<IUserIdentity> {
    return this.http
      .post<ApiResponse<IUserIdentity>>(
        `${this.authEndpoint}/login`,
        credentials
      )
      .pipe(
        map(
          (response: ApiResponse<IUserIdentity>) =>
            response.results as IUserIdentity
        ),
        tap((user: IUserIdentity) =>
          console.log(`Logged in user: ${user.email}`)
        ),
        catchError(this.handleError)
      );
  }

  register(credentials: IUserCredentials): Observable<IUserInfo> {
    return this.http
      .post<IUserInfo>(`${this.authEndpoint}/register`, credentials)
      .pipe(
        tap((response: IUserInfo) =>
          console.log(`Registered user: ${response.email}`)
        ),
        catchError(this.handleError)
      );
  }

  public getUserData(): Observable<IUserIdentity> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No auth token found');
    }
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken)
    const email = decodedToken.email;
    const userEndpoint = `${this.endpoint}/${email}`;
    return this.http.get<{ results: IUserIdentity }>(userEndpoint).pipe(
      map((response) => {
        return response.results;
      })
    );
  }



  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('UserService handleError', error);
    return throwError(() => new Error(error.message));
  }
}
