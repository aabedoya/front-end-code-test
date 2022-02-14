import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BallSelectorComponent } from "./ball-selector/ball-selector.component";
import { BetSlipComponent } from './bet-slip/bet-slip.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "€ ",
  suffix: "",
  thousands: "."
};
@NgModule({
  declarations: [
    AppComponent,
    BallSelectorComponent,
    BetSlipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }