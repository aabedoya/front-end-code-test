import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {
  balls: any[] = [];
  ballsClicked: any[]=[];

  constructor(
    private dataService: DataService
  ) {
    this.balls=[1,2,3,4,5,6,7,8,9,10]
  }

  ngOnInit(): void {
    //this.balls=[1,2,3,4,5,6,7,8,9,10]
  }
  bolaCliqueada(b:number){
    this.ballsClicked.push(b);
    console.log(b);
    this.dataService.addBall(this.ballsClicked.values)
    console.log(this.ballsClicked)
  }

  clearSelection(){
    this.ballsClicked.length=0;
    this.dataService.clear();
  }

}