import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { fromEvent} from 'rxjs';


@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss'],
  //providers: [DataService]
})
export class BetSlipComponent implements OnInit {

  public boardForm: any;
  public AvailableCredit: number = 10000;
  public selectedNumber: any[] = [];
  public totalBallSelected: number = 0;
  public total: number = 0;
  public lugar!: { valor: any; };
  public isWinner = false;
  public forPayMessage: number=0;
  ballsSelected!: number[];

  constructor(private dataService: DataService) {
  }
  onSubmit(form: NgForm){
    const {valor} = form.value;
    this.lugar = {
      valor
    }
}

  ngOnInit(): void {
    this.isWinner = false;
      this.dataService.getBalls$().subscribe(balls=>{
        this.ballsSelected = balls;
        this.totalBallSelected=this.ballsSelected.length;
        console.log('bolas seleccionadas',this.totalBallSelected);
  });
}

validationBoard(): any {
  this.boardForm = new FormGroup({
    value: new FormControl('', [Validators.required])
  });
}

  onClickSubmit(data: { valor: number; }){
    if(data.valor<5){
      Swal.fire('Minimum bet 5 Euros');
    }else if(data.valor*this.totalBallSelected>this.AvailableCredit){
      Swal.fire('Insufficient credit to bet');
    }else{
      if(this.totalBallSelected===0){
        Swal.fire('Select at least one ballot');
      }else{
        this.total=data.valor*this.totalBallSelected
        Swal.fire('Total bet € ',String(this.total));
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
        console.log(numberWin)
        console.log(element)
        if(element===numberWin){
          this.AvailableCredit+=((this.total/this.totalBallSelected)*1.5);
          this.forPayMessage=((this.total/this.totalBallSelected)*1.5);
          this.isWinner=true;
          Swal.fire({
            title: '¡ Win Number is '+numberWin,
            text: 'You are a WINNER, has won € ' + this.forPayMessage + ' euros.',
            imageUrl: 'https://i.ibb.co/mX5ntFy/WinBall.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
          })
          this.dataService.clear();
          this.total=0;;
          this.ballsSelected.length=0;
          
        }
      });
      if(this.isWinner==false){
        this.isWinner=false
        Swal.fire({
          title: '¡ Win Number is '+numberWin,
          text: 'You are not a winner. keep trying.',
          imageUrl: 'https://i.ibb.co/M95h9k3/YouLose.gif',
          imageWidth: 640,
          imageHeight: 360,
          imageAlt: 'Custom image',
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

