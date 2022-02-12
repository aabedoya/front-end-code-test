import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})
export class BetSlipComponent implements OnInit {
public valueBet: number = 0;
public amountBet: number = 10000;

  constructor() { }
  
  ngOnInit(): void {
  }

}
