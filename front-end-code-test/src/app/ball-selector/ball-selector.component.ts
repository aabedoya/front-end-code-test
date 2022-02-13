import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {
  balls: any[] = [];


  constructor() {}

  ngOnInit(): void {
    this.balls=[1,2,3,4,5,6,7,8,9,10]
  }
  bolaCliqueada(b:number){
    Swal.fire('Hola clic');
  }

}