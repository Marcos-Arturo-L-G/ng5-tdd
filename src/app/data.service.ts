import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ResponseApi } from '../../models/responseapi';
import { GoalsApi } from './goalsApi';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  private goals = new BehaviorSubject<any> (['the inital goal','another silly life goal']);
  goal = this.goals.asObservable();

  constructor(private http: HttpClient) { }

  changeGoal(goal: any){
    this.goals.next(goal);
  }

  apiURL = 'http://34.125.7.41:8112/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  }

  getGoals(): Observable<GoalsApi>{
    return this.http.get<GoalsApi>(this.apiURL + '/minecraft', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
