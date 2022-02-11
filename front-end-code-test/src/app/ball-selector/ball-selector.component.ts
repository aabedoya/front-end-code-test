import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {
  balls: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.balls=[0,1,2,3,4,5,6,7,8,9]
  }

}