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
  
  multiplicarapuesta(){
    /* console.log('Valor del input',document.getElementById('input-text'));
    this.amount = Number(document.getElementById('input-text'));
    console.log(this.amount);
    this.total = this.totalBallSelected * this.amount; */
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

