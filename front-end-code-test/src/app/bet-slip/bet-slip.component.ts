import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss'],
  providers: []
})

export class BetSlipComponent implements OnInit {

  public boardForm: any;
  public AvailableCredit: number = 10000;
  public selectedNumber: any[] = [];
  public totalBallSelected: number = 0;
  public total: number = 0;
  public formValue!: { betValue: any; };
  public isWinner = false;
  public forPayMessage: number=0;
  ballsSelected!: number[];

  constructor(private dataService: DataService) {
  }
  onSubmit(form: NgForm){
    const {betValue} = form.value;
    this.formValue = {
      betValue
    }
  }

  ngOnInit(): void {
    this.isWinner = false;
    this.dataService.getBalls$().subscribe(balls=>{
      this.ballsSelected = balls;
      this.totalBallSelected=this.ballsSelected.length;
    });
  }

  validationBoard(): any {
    this.boardForm = new FormGroup({
      value: new FormControl('', [Validators.required])
    });
  }

  onClickSubmit(data: { betValue: number; }){
    if(data.betValue<5){
      Swal.fire('Minimum bet 5 Euros');
    }else if(data.betValue*this.totalBallSelected>this.AvailableCredit){
      Swal.fire('Insufficient credit to bet');
    }else{
      if(this.totalBallSelected===0){
        Swal.fire('Select at least one ballot');
      }else{
        this.total=data.betValue*this.totalBallSelected;
        Swal.fire('€ '+this.total+' To bet');
      }
    }
  }

  onClickPlaceBet(){
    if(this.totalBallSelected<1){
      Swal.fire('Select at least one ballot');
    }else if(this.total<5){
      Swal.fire('Minimum bet 5 Euros');
    }else{
      this.AvailableCredit-=this.total;
      const numberWin=this.getRandomNumber();
      this.ballsSelected.forEach(element => {
        if(element===numberWin){
          this.AvailableCredit+=((this.total/this.totalBallSelected)*1.5);
          this.forPayMessage=((this.total/this.totalBallSelected)*1.5);
          this.isWinner=true;
          Swal.fire({
            title: '¡ Win Number is '+numberWin,
            text: 'You are a WINNER, has won € ' + this.forPayMessage,
            imageUrl: 'https://i.ibb.co/mX5ntFy/WinBall.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'You win image',
          });
          this.dataService.clear();
          this.total=0;
          this.ballsSelected.length=0;
        }
      });
      if(this.isWinner==false){
        this.isWinner=false;
        Swal.fire({
          title: '¡ Win Number is '+numberWin,
          text: 'You are not a winner. keep trying.',
          imageUrl: 'https://i.ibb.co/M95h9k3/YouLose.gif',
          imageWidth: 640,
          imageHeight: 360,
          imageAlt: 'You lose image',
        })
        this.dataService.clear();
        this.total=0;;
        this.ballsSelected.length=0;
      }
    }
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }
}

