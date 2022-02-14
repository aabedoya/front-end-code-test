import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class ballsSelected{
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private balls: any[];
  private balls$: Subject<any[]>;

  constructor() {
    this.balls=[];
    this.balls$=new Subject();
  }

  addBall(pBall:any){
    this.balls.push(Number(pBall));
    this.balls$.next(this.balls);
    console.log('Bola agregada');
    console.log(this.balls);
  }

  getBalls$(): Observable<number[]>{
    return this.balls$.asObservable();
  }

  clear(){
    this.balls.length=0;
    this.balls$.unsubscribe;
  }
}
