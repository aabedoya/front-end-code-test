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
  
  public valueBet: number = 0;
  public amountBet: number = 10000;
  public boardForm: any;
  public disableBet = false;
  public AvailableCredit: number=10000;
  public numero: number = 0;
  public selectedNumber: any[] = [];
  public viewCard = false;
  public stakeValue: any;
  public totalWon: any;
  public NumberWon: any;
  public totalBallSelected: number = 0;
  public amount: number = 0;
  public total: number = 0;
  public monto: number=0;
  public subTotal: number=0;

  ballsSelected!: number[];
  lugar!: { valor: any; };

  constructor(private dataService: DataService) {
  }
  onSubmit(form: NgForm){
    const {valor} = form.value;
    this.lugar = {
      valor
    }
}

  ngOnInit(): void {
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
      Swal.fire('Apuesta mínima 5 Euros');
    }else if(data.valor*this.totalBallSelected>this.AvailableCredit){
      Swal.fire('No te alcanza el dinero');
    }else{
      this.total=data.valor*this.totalBallSelected
      Swal.fire('Total apostar',String(this.total));
    }
  }

  onClickPlaceBet(){
    if(this.totalBallSelected<1){
      Swal.fire('Selecciona al menos una balota');
    }else if(this.total<5){
      Swal.fire('Apuesta mínima 5 Euros');
    }else{
      this.AvailableCredit-=this.total
      const numberWin=this.getRandomNumber();
      this.dataService.clear()
      this.total=0;
      this.ballsSelected.length=0;
      
        Swal.fire({
        title: '¡ Win Number is '+numberWin,
        text: 'Verify your tickets, please.',
        imageUrl: 'https://i.ibb.co/mX5ntFy/WinBall.gif',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      })
      //Swal.fire('Numero ganador es el: ',String(numberWin));
    }
  }

  // validationValue(): any {
  //   if(Number(this.monto)<5){//if (+this.boardForm.get('value').value < 5) {//
  //     this.disableBet = false;
  //     this.boardForm.reset();
  //     Swal.fire('Apuesta mínima 5 Euros');
  //   } else if (+this.boardForm.get('value').value >= this.AvailableCredit ) {
  //     this.disableBet = false;
  //     this.boardForm.reset();
  //     Swal.fire('No te alcanza el dinero');
  //   } else {
  //     this.disableBet = true;
  //     Swal.fire('Apuesta no mas');
  //   }
  // }

  private ViewResult(won: any) {
    Swal.fire('El 8 es ganador')
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }

}

