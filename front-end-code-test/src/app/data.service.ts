import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';


export class ballsSelected{
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private balls: number[];
  private balls$: Subject<number[]>;

  constructor() {
    this.balls=[];
    this.balls$=new Subject();
  }

  addBall(pBall:any){
    this.balls.push(Number(pBall));
    this.balls$.next(this.balls);
    console.log(pBall,'Bola agregada');
    console.log('Bolas',this.balls);
  }

  getBalls$(): Observable<number[]>{
    return this.balls$.asObservable();
  }

  clear(){
    this.balls.length=0;
    this.balls$.unsubscribe;
  }
}
