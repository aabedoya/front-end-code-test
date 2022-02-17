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
  
  firstTime!: boolean;

  constructor(
    private dataService: DataService
  ) {
    this.balls=[1,2,3,4,5,6,7,8,9,10]
  }

  ngOnInit(): void {
    
    //this.balls=[1,2,3,4,5,6,7,8,9,10]
  }
  bolaCliqueada(b:number){
  if(this.ballsClicked.length<1){
    this.ballsClicked.push(b);
    this.dataService.addBall(b)
    console.log('Cuando es menor que 1')
  }else{
        console.log('Si >1');
        let find=this.ballsClicked.includes(b)
        console.log('find');
        //this.ballsClicked.forEach(element =>{
        if(find==true){
          Swal.fire('This ball was selected')
        }else{
          this.ballsClicked.push(b);
          this.dataService.addBall(b)
        }
  }
  }

//this.dataService.addBall(this.ballsClicked.values)

  clearSelection(): void{
    this.ballsClicked.length=0;
    this.dataService.clear();
  }

}