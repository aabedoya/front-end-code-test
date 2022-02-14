import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {
  public valueBet: number = 0;
  public amountBet: number = 10000;
  public betSlipForm: any;
  public disableBet: any;
  public AvailableCredit: number=10000;
  public numero: number = 0;
  public selectedNumber: any[] = [];
  public viewCard = false;
  public stakeValue: any;
  public totalWon: any;
  public NumberWon: any;
  public ballsSelected: number[] = [];
  public totalBallSelected: any = 0;
  public amount: number = 0;
  public total: number = 0;
  public monto: number=0;

  

  constructor(private dataService: DataService) {
  }


  ngOnInit(): void {
    this.dataService.getBalls$().subscribe(balls=>{
      this.ballsSelected = balls;
      console.log('suscrito!')
      this.totalBallSelected=this.ballsSelected.length;
    });

    // const observable1 = fromEvent(button.addEventListener, 'click').subscribe(() =>
    //   console.log('You clicked the page!')
    // );
  }
  validationBoard(): any {
    this.betSlipForm = new FormGroup({
      value: new FormControl('', [Validators.required])
    });
  }
  onSubmit(){

  }
  multiplicarapuesta(){
   
    /* console.log('Valor del input',document.getElementById('input-text'));
    this.amount = Number(document.getElementById('input-text'));
    console.log(this.amount);
    this.total = this.totalBallSelected * this.amount; */
  }

  validationValue(): any {
    if (+this.betSlipForm.get('value').value < 5) {
      this.disableBet = false;
      Swal.fire('Apuesta mínima 5 Euros');
      this.betSlipForm.reset();
    } else if (+this.betSlipForm.get('value').value >= this.AvailableCredit ) {
      this.disableBet = false;
      this.betSlipForm.reset();
    } else {
      this.disableBet = true;
    }
  }

  GenerateBet(): any {
    if (this.selectedNumber.length <= 0) {
      Swal.fire('Seleccione al menos 1 balota');
    }
    else {
      this.viewCard = true;
      this.stakeValue = this.betSlipForm.get('value').value;
      this.totalWon = (this.stakeValue * 1.5) / 100;
      var ramdon = this.getRandomArbitrary();
      console.log(ramdon);
      this.NumberWon = ramdon;

        Swal.fire({
        title: 'Generating result',
        html: '¡The winning number is <b></b> !',
        timerProgressBar: true,
        showDenyButton: false,
        confirmButtonText: 'Ok',
            didOpen: () => {
                Swal.showLoading();
                setInterval(() => {
                    this.ViewResult(this.NumberWon)
                  }, 3000)
            },
        }).then((result) => {
          if (result.isConfirmed) {
            this.SaveHistory();
          }
        })
    }
  }

  private ViewResult(won: any) {
    Swal.fire('El 8 es ganador')
  }

  SaveHistory(): any {
    Swal.fire('Guardado')
  }
  getRandomArbitrary() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }

}
