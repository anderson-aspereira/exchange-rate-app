import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ExchangeRate } from '../model/ExchangeRate';



const endpoint = 'http://localhost:8080/exchangeRate';

const localUrl = 'assets/data/exchangerate.json';



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



  listExchangeRate(code:string): Observable<any> {
    
    
    return this.http.get<ExchangeRate[]>(endpoint + "?code=" +code).pipe(
      retry(3), catchError(this.handleError));
  }


 

  updateExchangeRate(code: string): Observable<any> {
    return this.http.put<any>(endpoint + '/updateAll?code='+ code, {}).pipe(
      catchError(this.handleError)
    );
  }

 
}
