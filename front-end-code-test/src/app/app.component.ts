import { Component } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:
  [
    trigger('triggerBackgroundChange',
    [
      state('fisrt', style({'background-color':'yellow','color':'black'})),
      state('second', style({'background-color':'red', 'color':'white'})),
      transition('*=>*',animate(3000))
    ])
  ]
})

export class AppComponent {
  title = 'Winning Balls';
  color: string= 'first';
  changeColor(){
    if(this.color=='first')
      this.color='second';
    else
    this.color='first';
  }
}
