import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Authors } from '../../../typings/poem';

@Injectable({
  providedIn: 'root',
})
export class PoetryApiService {
  private basePoetryApiUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Authors> {
    return this.http
      .get(`${this.basePoetryApiUrl}/author`, { observe: 'response' })
      .pipe(
        switchMap((response) => {
          if (response.status !== 200) {
            return throwError(
              () => new Error(`Unexpected status code: ${response.status}`)
            );
          }
          // Extract the response body if status is 200
          return [response.body as Authors];
        }),
        catchError((error) => this.handleError(error))
      );
  }

  getAuthorTitles(author: string): Observable<any> {
    const url = `${this.basePoetryApiUrl}/author/${encodeURIComponent(
      author
    )}/title`;
    return this.http.get(url, { observe: 'response' }).pipe(
      switchMap((response) => this.validateStatus(response)),
      catchError((error) => this.handleError(error))
    );
  }

  getPoemByAuthorAndTitle(author: string, title: string): Observable<any> {
    const url = `${this.basePoetryApiUrl}/author,title/${encodeURIComponent(
      author
    )};${encodeURIComponent(title)}`;
    return this.http.get(url, { observe: 'response' }).pipe(
      switchMap((response) => this.validateStatus(response)),
      catchError((error) => this.handleError(error))
    );
  }

  private validateStatus(response: any): Observable<any> {
    if (response.status !== 200) {
      return throwError(
        () => new Error(`Unexpected status code: ${response.status}`)
      );
    }
    return of(response.body);
  }
  private handleError(error: any): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private getErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      return `Server error: ${error.status} - ${error.message}`;
    }
  }
}
