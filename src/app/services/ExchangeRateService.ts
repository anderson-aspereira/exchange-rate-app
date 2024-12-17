import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ExchangeRate } from '../model/ExchangeRate';



const endpoint = 'http://localhost:8080/exchangeRate';

const localUrl = 'assets/data/smartphone.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })

  

};

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }



  listExchangeRate(): Observable<any> {
    //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.get<ExchangeRate[]>(endpoint, httpOptions).pipe(
      retry(3), catchError(this.handleError));
  }


 

  updateExchangeRate(): Observable<any> {
    return this.http.put<any>(endpoint + '/updateAll', {}).pipe(
      catchError(this.handleError)
    );
  }

 
}
