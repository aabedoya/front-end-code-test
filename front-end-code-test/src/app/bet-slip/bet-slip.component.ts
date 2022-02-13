import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgModule } from '@angular/core';
import { fromEvent} from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {
  public valueBet: number = 0;
  public amountBet: number = 10000;
  public boardForm: any;
  public disableBet: any;
  public AvailableMoney: any;
  public numero: number = 0;
  public selectedNumber: any[] = [];
  public viewCard = false;
  public stakeValue: any;
  public totalWon: any;
  public NumberWon: any;
  public ballsSelected: any[] = [1,2,3,4];
  public totalBallSelected: number = 0;
  public amount: number = 0;
  public total: number = 0;
  public monto: number=0;
  
  constructor() { }
  
  ngOnInit(): void {
     this.totalBallSelected = this.ballsSelected.length;
    // const observable1 = fromEvent(button.addEventListener, 'click').subscribe(() =>
    //   console.log('You clicked the page!')
    // );
  }

  multiplicarapuesta(){
    
    /* console.log('Valor del input',document.getElementById('input-text'));
    this.amount = Number(document.getElementById('input-text'));
    console.log(this.amount);
    this.total = this.totalBallSelected * this.amount; */
  }

  validationValue(): any {
    if (+this.boardForm.get('value').value < 5) {
      this.disableBet = false;
      Swal.fire('Apuesta mínima 5 Euros');
      this.boardForm.reset();
    } else if (+this.boardForm.get('value').value >= this.AvailableMoney ) {
      this.disableBet = false;
      this.boardForm.reset();
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
      this.stakeValue = this.boardForm.get('value').value;
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
