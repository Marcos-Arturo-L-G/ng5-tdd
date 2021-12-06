import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  private goals = new BehaviorSubject<any> (['the inital goal','another silly life goal']);
  goal = this.goals.asObservable();
	//apiurl="apiurl"

  constructor() { }

  changeGoal(goal: any){
    this.goals.next(goal);
  }

}
